import { pool } from "../db.js";
import bcrypt from "bcrypt";

// ---------------------------------------- get users ------------------------------------------

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");

    rows.forEach((user) => {
      delete user.contraseña;
    });

    res.status(202).json({ usuarios: rows });
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- Login ------------------------------------------

export const login = async (req, res) => {
  try {
    const { user, password } = req.params;

    if (!user || !password) {
      return res.status(400).send("Faltan datos obligatorios");
    }

    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE usuario = ?",
      [user]
    );

    if (existingUsers.length === 0) {
      return res.status(401).send("El usuario no existe");
    }

    const usuarioEncontrado = existingUsers[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      usuarioEncontrado.contraseña
    );

    if (!isPasswordValid) {
      return res.status(401).send("Contraseña incorrectos");
    }

    res
      .status(200)
      .json({ mensaje: "Login exitoso", usuario: usuarioEncontrado });
  } catch (error) {
    res.status(500).send("Error interno del servidor: " + error);
  }
};

// ---------------------------------------- post users ------------------------------------------

export const postUsuarios = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res.status(400).send("Faltan enviar datos obligatorios");
    }

    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE usuario = ?",
      [usuario]
    );

    if (existingUsers.length > 0) {
      return res.status(409).send("Ya existe un usuario con el mismo nombre");
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await pool.query(
      "INSERT INTO users (usuario, contraseña) VALUES (?, ?)",
      [usuario, hashedPassword]
    );

    const newUserId = result.insertId;

    const [newUser] = await pool.query(
      "SELECT id, usuario FROM users WHERE id = ?",
      [newUserId]
    );

    if (newUser.length > 0) {
      res.status(201).json(newUser[0]);
    } else {
      res.status(500).send("Error al obtener el usuario recién creado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor: " + error.message);
  }
};

// ---------------------------------------- put users ------------------------------------------

export const putUsers = async (req, res) => {
  try {
    const { usuario, contraseña, id } = req.body;

    if (!id) {
      return res.status(400).send("Falta enviar el ID del usuario");
    }

    let hashedPassword = null;
    if (contraseña) {
      hashedPassword = await bcrypt.hash(contraseña, 10);
    }

    const [result] = await pool.query(
      `UPDATE users 
       SET usuario = IFNULL(?, usuario), 
           contraseña = IFNULL(?, contraseña) 
       WHERE id = ?`,
      [usuario, hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("El usuario no existe");
    }

    const [updatedUser] = await pool.query(
      "SELECT id, usuario FROM users WHERE id = ?",
      [id]
    );

    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor: " + error.message);
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
