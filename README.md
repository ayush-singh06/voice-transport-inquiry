# 🚌 BMTC Voice Transport Inquiry System

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

A web application designed to simplify commuting in Bangalore by allowing users to search for BMTC (Bangalore Metropolitan Transport Corporation) bus information using natural language voice commands or traditional text input. The system provides details on bus numbers, routes, and specific platform numbers at the Majestic Bus Stand.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Database Configuration](#-database-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

## ✨ Features

- **🎙️ Voice Search**: Uses the Web Speech API to interpret natural language queries (e.g., *"Which bus goes from Majestic to Whitefield?"*).
- **📝 Text Search**: Traditional dropdown selection for Source and Destination for precise queries.
- **🗺️ Interactive Map**: Visualizes platform locations at the Majestic Bus Stand using Google Maps API (KML integration).
- **📍 Platform Navigation**: Clickable platform numbers in search results that highlight the specific location on the map.
- **📱 Responsive Design**: Accessible on both desktop and mobile devices.

## 🛠 Technologies Used

### Frontend
- **HTML5 & CSS3**: For structure and styling.
- **JavaScript (ES6+)**: for client-side logic and DOM manipulation.
- **Web Speech API**: For converting voice to text.
- **Google Maps API**: For displaying the interactive map and KML layers.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for handling API requests.
- **MySQL**: Relational database for storing bus, route, and platform data.
- **mysql2**: MySQL client for Node.js.
- **dotenv**: For environment variable management.

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 recommended)
- A modern web browser (Chrome/Edge recommended for Web Speech API support)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/voice-transport-inquiry.git
   cd voice-transport-inquiry
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=bmtc_transport
   PORT=5000
   ```

## 🗄️ Database Configuration

1. **Create the Database**
   Log in to your MySQL console and create the database:
   ```sql
   CREATE DATABASE bmtc_transport;
   USE bmtc_transport;
   ```

2. **Import Schema and Data**
   Run the SQL script located in the `database` folder:
   ```bash
   mysql -u root -p bmtc_transport < database/init.sql
   ```
   *(Alternatively, you can import `database/init.sql` using a tool like phpMyAdmin or MySQL Workbench.)*

## 🎮 Usage

1. **Start the Server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`.

2. **Access the Application**
   Open your browser and navigate to `http://localhost:5000`.

3. **Search for Buses**
   - **Voice**: Click the microphone icon 🎤 and say, *"Bus from [Source] to [Destination]"*.
   - **Manual**: Select your **Source** and **Destination** from the dropdown menus and click **Search**.

4. **View Results**
   - The system will display relevant bus numbers and the platform number at Majestic.
   - Click on the **Platform Number** in the results to view its exact location on the map.

## 📡 API Documentation

### 1. Get Stops
Retrieves a list of all available sources and destinations.

- **URL**: `/stops`
- **Method**: `GET`
- **Success Response**:
  ```json
  {
    "sources": ["Majestic", "KBS", ...],
    "destinations": ["Electronic City", "Whitefield", ...]
  }
  ```

### 2. Query Bus Info
Process a natural language query or structured search to find bus details.

- **URL**: `/query`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "query": "from Majestic to Electronic City"
  }
  ```
- **Success Response**:
  ```json
  {
    "answer": "Bus 356C from Majestic to Electronic City departs from Platform 14"
  }
  ```

## 📂 Project Structure

```
voice-transport-inquiry/
├── backend/
│   ├── db.js             # Database connection configuration
│   └── index.js          # Main Express server and API endpoints
├── database/
│   └── init.sql          # SQL script for table creation and initial data
├── frontend/
│   ├── bengaluru...kml   # KML file for map overlay
│   ├── index.html        # Main landing page
│   ├── map.html          # Map view page
│   └── style.css         # Application styling
├── .env                  # Environment variables (not committed)
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## 🔮 Future Enhancements

- **Real-time Tracking**: Integrate GPS API for live bus tracking.
- **Multilingual Support**: Support for Kannada and Hindi voice queries.
- **Fare Calculator**: Estimate ticket prices based on distance.
- **PWA Support**: Make the app installable on mobile devices.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

