import { pool } from "../db.js";

// ---------------------------------------- get vinos ------------------------------------------

export const getVinos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vinos");
    res.status(202).send(rows);
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- post vinos ------------------------------------------

export const postVinos = async (req, res) => {
  try {
    const {
      nombre,
      titulo,
      descripcion,
      resumen,
      varietal,
      fermentacion,
      crianza,
      img,
      subtitulo,
      imgsecundaria,
    } = req.body;

    if (
      !nombre ||
      !titulo ||
      !descripcion ||
      !resumen ||
      !varietal ||
      !fermentacion ||
      !crianza ||
      !img ||
      !subtitulo ||
      !imgsecundaria
    ) {
      res.status(404).send("Faltan enviar datos obligatorios");
    } else {
      const [existingVinos] = await pool.query(
        "SELECT * FROM vinos WHERE nombre = ?",
        [nombre]
      );

      if (existingVinos.length > 0) {
        res.status(409).send("Ya existe un vino con el mismo nombre");
      } else {
        const [rows] = await pool.query(
          `INSERT INTO vinos (nombre,  titulo, descripcion, resumen, varietal, fermentacion, crianza, img, subtitulo, imgsecundaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,
          [
            nombre,
            titulo,
            descripcion,
            resumen,
            varietal,
            fermentacion,
            crianza,
            img,
            subtitulo,
            imgsecundaria,
          ]
        );

        res.status(202).send(`Vino creado correctamente`);
      }
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- put vinos ------------------------------------------

export const putVinos = async (req, res) => {
  try {
    const {
      imgsecundaria,
      subtitulo,
      nombre,
      resumen,
      varietal,
      fermentacion,
      img,
      crianza,
      id,
      titulo,
      descripcion,
    } = req.body;
    const [result] = await pool.query(
      `UPDATE vinos SET imgsecundaria = IFNULL(?, imgsecundaria), subtitulo = IFNULL(?, subtitulo), nombre = IFNULL(?, nombre), resumen = IFNULL(?, resumen), varietal = IFNULL(?, varietal), fermentacion = IFNULL(?, fermentacion), img = IFNULL(?, img), crianza = IFNULL(?, crianza), titulo = IFNULL(?, titulo), descripcion = IFNULL(?, descripcion)
     WHERE id = ?`,
      [
        imgsecundaria,
        subtitulo,
        nombre,
        resumen,
        varietal,
        fermentacion,
        img,
        crianza,
        titulo,
        descripcion,
        id,
      ]
    );
    if (result.affectedRows > 0) {
      res.status(202).send("Vino modificado");
    } else {
      res.status(404).send("El vino no existe");
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};

// ---------------------------------------- delete vinos ------------------------------------------

export const deleteVinos = async (req, res) => {
  try {
    const { nombre } = req.params;

    if (nombre) {
      const result = await pool.query("DELETE FROM vinos WHERE nombre = ?", [
        nombre,
      ]);

      if (result[0].affectedRows !== 0) {
        res.status(202).send("Vino eliminado");
      } else {
        res.status(404).send("El vino no existe");
      }
    } else {
      res.status(404).send("Falta enviar nombre");
    }
  } catch (error) {
    res.status(404).send("Error interno del servidor:" + error);
  }
};
