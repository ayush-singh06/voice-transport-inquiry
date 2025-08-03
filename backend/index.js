const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/query', async (req, res) => {
  const userQuery = req.body.query.toLowerCase();
  console.log(`Received query: ${userQuery}`);

  const fromMatch = userQuery.match(/from (.*?) to/);
  const toMatch = userQuery.match(/to (.*)/);

  if (!fromMatch || !toMatch) {
    return res.status(400).json({ answer: 'Please specify both source and destination.' });
  }

  const source = fromMatch[1].trim();
  const destination = toMatch[1].trim();

  console.log(`Parsed from: ${source}, to: ${destination}`);

  try {
    const [rows] = await db.query(
      `SELECT bus_number, platform FROM buses WHERE LOWER(source) = ? AND LOWER(destination) = ?`,
      [source.toLowerCase(), destination.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.json({ answer: `No buses found from ${source} to ${destination}.` });
    }

    const busInfo = rows.map(row => 
      `Bus ${row.bus_number} from ${source} to ${destination} departs from Platform ${row.platform}`
    ).join(' ');

    res.json({ answer: busInfo });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ answer: 'Server error occurred.' });
  }
});

app.get('/stops', async (req, res) => {
  try {
    const [sources] = await db.query('SELECT DISTINCT source FROM buses');
    const [destinations] = await db.query('SELECT DISTINCT destination FROM buses');
    res.json({
      sources: sources.map(row => row.source).filter(s => s && s.toLowerCase() !== 'null').sort(),
      destinations: destinations.map(row => row.destination).filter(d => d && d.toLowerCase() !== 'null').sort()
    });
  } catch (error) {
    console.error('Error fetching stops:', error);
    res.status(500).json({ sources: [], destinations: [] });
  }
});
app.use(express.static(path.join(__dirname, '../frontend')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));