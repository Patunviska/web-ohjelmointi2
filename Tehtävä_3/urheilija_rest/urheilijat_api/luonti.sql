CREATE DATABASE IF NOT EXISTS urheilijat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE urheilijat;

CREATE TABLE IF NOT EXISTS urheilijat (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  etunimi VARCHAR(100) NOT NULL,
  sukunimi VARCHAR(100) NOT NULL,
  kutsumanimi VARCHAR(100) NULL,
  syntyma DATE NULL,                  
  paino DECIMAL(5,2) NULL,            
  kuva_url VARCHAR(500) NULL,         
  laji VARCHAR(120) NULL,
  saavutukset TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);