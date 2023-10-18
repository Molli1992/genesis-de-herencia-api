import { pool } from "../db.js";

// ---------------------------------------- get users ------------------------------------------

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(202).send("Usuarios" + rows);
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- post users ------------------------------------------

export const postUsuarios = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

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
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- put users ------------------------------------------

export const putUsers = async (req, res) => {
  try {
    const { usuario, contraseña, id } = req.body;
    const [result] = await pool.query(
      `UPDATE users SET usuario = IFNULL(?, usuario), contraseña = IFNULL(?, contraseña)
     WHERE id = ?`,
      [usuario, contraseña, id]
    );
    if (result.affectedRows > 0) {
      res.status(202).send("Usuario modificado");
    } else {
      res.status(404).send("El usuario no existe");
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- delete usuarios ------------------------------------------

export const deleteUsers = async (req, res) => {
  try {
    const { usuario } = req.params;

    if (usuario) {
      const result = await pool.query("DELETE FROM users WHERE usuario = ?", [
        usuario,
      ]);

      if (result[0].affectedRows !== 0) {
        res.status(202).send("Usuario eliminado");
      } else {
        res.status(404).send("El usuario no existe");
      }
    } else {
      res.status(404).send("Falta enviar usuario");
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

/*
    if (!usuario || !contraseña) {
      res.status(404).send("Faltan enviar datos obligatorios" + req.body);
    }
*/
