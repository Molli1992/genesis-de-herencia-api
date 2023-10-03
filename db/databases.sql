CREATE DATABASE IF NOT EXISTS genesisdeherencias;

USE genesisdeherencias;

CREATE TABLE vinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    titulo TEXT,
    descripcion TEXT,
    resumen TEXT,
    varietal TEXT,
    fermentacion TEXT,
    crianza TEXT,
    img TEXT
);