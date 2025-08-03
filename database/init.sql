CREATE DATABASE IF NOT EXISTS bmtc_transport;
USE bmtc_transport;

CREATE TABLE buses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bus_number VARCHAR(20),
    source VARCHAR(100),
    destination VARCHAR(100),
    via TEXT,
    platform VARCHAR(20)
);
SET GLOBAL local_infile = 1;
TRUNCATE TABLE buses;
LOAD DATA LOCAL INFILE 'C:\\Users\\ayush\\voice-transport-inquiry\\cleaned_bmtc_buses.csv'
INTO TABLE buses
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(bus_number, source, destination, via, platform);