document.addEventListener('DOMContentLoaded', () => {
  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
      theme = 'dark';
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
  });

  // --- ELEMENT REFERENCES ---
  const micButton = document.getElementById('micButton');
  const userQuery = document.getElementById('userQuery');
  const result = document.getElementById('result');
  const sourceSelect = document.getElementById('sourceSelect');
  const destinationInput = document.getElementById('destinationInput');
  const destinationList = document.getElementById('destinationList');
  const searchButton = document.getElementById('searchButton');
  const infoBtn = document.querySelector('.info-btn');
  const infoBox = document.getElementById('infobox');

  // --- API & RECOGNITION SETUP ---
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  // --- FUNCTIONS ---
  const formatAnswerWithLinks = (answer) => {
    return answer.replace(/Platform (\d+)/g, (match, platformNum) => {
      return `<a href="map.html?platform=${platformNum}" target="_blank" class="platform-link">Platform ${platformNum}</a>`;
    });
  };

  const populateStops = async () => {
    try {
      const res = await fetch('/stops');
      const data = await res.json();
      
      // Populate sources
      sourceSelect.innerHTML = ''; // Clear existing
      data.sources.forEach(stop => {
        const opt = document.createElement('option');
        opt.value = opt.text = stop;
        sourceSelect.appendChild(opt);
      });

      // Populate destinations
      destinationList.innerHTML = ''; // Clear existing
      data.destinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest;
        destinationList.appendChild(option);
      });
    } catch (err) {
      console.error('Failed to populate stops:', err);
      userQuery.textContent = 'Error: Could not load bus stop data.';
    }
  };
  
  const performQuery = async (queryString) => {
    result.innerHTML = 'Searching...';
    try {
      const response = await fetch('/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryString })
      });
      const data = await response.json();
      if (data.answer) {
        if (data.answer.includes('Platform')) {
          result.innerHTML = `✅ ${formatAnswerWithLinks(data.answer)}`;
        } else {
          result.textContent = `✅ ${data.answer}`;
        }
      } else {
        result.textContent = "❌ Sorry, I couldn't find any matching bus.";
      }
    } catch (err) {
      result.textContent = '❌ Error contacting server.';
      console.error(err);
    }
  };

  // --- EVENT LISTENERS ---
  micButton.addEventListener('click', () => {
    userQuery.textContent = 'Listening...';
    recognition.start();
  });
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userQuery.textContent = `You said: "${transcript}"`;
    performQuery(transcript);
  };
  
  recognition.onerror = (event) => {
    result.textContent = `❌ Voice recognition error: ${event.error}`;
  };

  searchButton.addEventListener('click', () => {
    const source = sourceSelect.value;
    const destination = destinationInput.value;
    if (!destination) {
        result.textContent = 'Please enter a destination.';
        return;
    }
    const queryString = `from ${source} to ${destination}`;
    userQuery.textContent = `Searching: ${source} to ${destination}`;
    performQuery(queryString);
  });

  infoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    infoBox.style.display = (infoBox.style.display === 'none' || infoBox.style.display === '') ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!infoBox.contains(e.target) && e.target !== infoBtn) {
        infoBox.style.display = 'none';
    }
  });


  // --- INITIALIZATION ---
  populateStops();
});
