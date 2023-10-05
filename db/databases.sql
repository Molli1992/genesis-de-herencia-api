CREATE DATABASE IF NOT EXISTS genesisdeherencias;
DROP DATABASE genesisdeherencias;

USE genesisdeherencias;
describe vinos;
describe users;

CREATE TABLE vinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    titulo TEXT,
    subtitulo TEXT,
    descripcion TEXT,
    resumen TEXT,
    varietal TEXT,
    fermentacion TEXT,
    crianza TEXT,
    img LONGTEXT,
    imgsecundaria LONGTEXT
) ENGINE=InnoDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario TEXT,
    contraseña TEXT
);