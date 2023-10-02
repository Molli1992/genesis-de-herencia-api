CREATE DATABASE IF NOT EXISTS genesisdeherencias;

USE genesisdeherencias;

CREATE TABLE vinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    titulo VARCHAR(255),
    descripcion TEXT,
    resumen TEXT,
    varietal VARCHAR(255),
    fermentacion VARCHAR(255),
    crianza VARCHAR(255),
    img VARCHAR(255)
);