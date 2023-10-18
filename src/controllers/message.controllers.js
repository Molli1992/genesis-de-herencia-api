import { pool } from "../db.js";

// ---------------------------------------- get vinos ------------------------------------------

export const getMessage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM message");
    res.status(202).json({ message: rows });
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- post vinos ------------------------------------------

export const postMessage = async (req, res) => {
  try {
    const { nombre, apellido, correo, asunto, comentarios, ledio } = req.body;

    if (!nombre || !apellido || !correo || !asunto || !comentarios || !ledio) {
      res.status(404).send("Faltan enviar datos obligatorios");
    } else {
      const [rows] = await pool.query(
        `INSERT INTO message (nombre, apellido, correo, asunto, comentarios, ledio) VALUES (?, ?, ?, ?, ?, ?) `,
        [nombre, apellido, correo, asunto, comentarios, ledio]
      );

      res.status(202).send(`Mensaje enviado correctamente` + rows);
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- put vinos ------------------------------------------

export const putMessage = async (req, res) => {
  try {
    const { ledio, id } = req.body;
    const [result] = await pool.query(
      `UPDATE message SET ledio = IFNULL(?, ledio)
     WHERE id = ?`,
      [ledio, id]
    );
    if (result.affectedRows > 0) {
      res.status(202).send("Mensaje modificado");
    } else {
      res.status(404).send("El mensaje no existe");
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};
