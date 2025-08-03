# BMTC Voice Transport Inquiry System

A web application that allows users to search for BMTC (Bangalore Metropolitan Transport Corporation) bus information using voice or text input. The application provides details about bus routes, sources, destinations, and platform numbers at Majestic Bus Stand.

## Features

- **Voice Search**: Ask questions about buses using natural language
- **Text Search**: Select source and destination from dropdowns
- **Interactive Map**: View platform locations at Majestic Bus Stand
- **Platform Navigation**: Click on platform numbers in search results to see their location on the map

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Google Maps API
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **APIs**: Web Speech API for voice recognition

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the MySQL database:
   - Create a database named `bmtc_transport`
   - Import data using the SQL script in the `database` folder
4. Create a `.env` file with the following variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=bmtc_transport
   ```
5. Start the application: `npm start`
6. Access the application at `http://localhost:5000`

## Usage

1. **Voice Search**: Click the microphone button and ask about buses (e.g., "Next bus from Majestic to Electronic City")
2. **Manual Search**: Select source and destination from the dropdowns and click Search
3. **View Platforms**: Click on platform numbers in search results to see their location on the map
4. **Interact with Map**: Click on platforms in the map for more information

## Project Structure

- `frontend/`: Contains HTML, CSS, and client-side JavaScript
- `backend/`: Contains Node.js server code
- `database/`: Contains SQL scripts for database setup