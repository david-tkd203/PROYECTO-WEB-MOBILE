CREATE DATABASE IF NOT EXISTS WebMobile;
USE WebMobile;

CREATE TABLE IF NOT EXISTS personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  edad INT NOT NULL,
  fechaNacimiento DATE NOT NULL
);

INSERT INTO personas (nombre, edad, fechaNacimiento) VALUES
('Juan', 25, '1998-05-10'),
('María', 30, '1993-11-22');

CREATE USER 'david'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
GRANT ALL PRIVILEGES ON ProyectoWebMobile.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;

