import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(202).send(rows);
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

export const postUsuarios = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      res.status(404).send("Faltan enviar datos obligatorios");
    } else {
      const [existingUsers] = await pool.query(
        "SELECT * FROM users WHERE usuario = ?",
        [usuario]
      );

      if (existingUsers.length > 0) {
        res.status(409).send("Ya existe un usuario con el mismo nombre");
      } else {
        const [rows] = await pool.query(
          `INSERT INTO users (usuario, contraseña) VALUES (?, ?) `,
          [usuario, contraseña]
        );

        res.status(202).send(`Usuario creado correctamente` + rows);
      }
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};
