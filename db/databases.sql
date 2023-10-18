CREATE DATABASE IF NOT EXISTS genesisdeherencias;
DROP DATABASE genesisdeherencias;
DROP TABLE nombre_de_la_tabla;

USE genesisdeherencias;
describe vinos;
describe users;
describe message;

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

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    correo TEXT,
    asunto TEXT,
    comentarios TEXT,
    ledio TEXT
);


INSERT INTO users VALUES
("marcelo", "z9000Vinos"),
("milagros", "z9000Vinos");