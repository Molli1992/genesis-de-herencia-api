import { pool } from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import {
  CloudinatyCloudName,
  CloudinatyApiKey,
  CloudinatyApiSecret,
} from "../config.js";

cloudinary.config({
  cloud_name: CloudinatyCloudName,
  api_key: CloudinatyApiKey,
  api_secret: CloudinatyApiSecret,
});

// ---------------------------------------- get vinos ------------------------------------------

export const getVinos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vinos");
    res.status(202).json({ vinos: rows });
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
      subtitulo,
    } = req.body;

    let imgUrl = null;
    let imgSecUrl = null;

    if (req.files?.img) {
      const imgFile = Array.isArray(req.files.img)
        ? req.files.img[0]
        : req.files.img;
      const imgUpload = await cloudinary.uploader.upload(imgFile.tempFilePath, {
        folder: "vinos",
      });
      imgUrl = imgUpload.secure_url;
    }

    if (req.files?.imgsecundaria) {
      const imgSecFile = Array.isArray(req.files.imgsecundaria)
        ? req.files.imgsecundaria[0]
        : req.files.imgsecundaria;
      const imgSecUpload = await cloudinary.uploader.upload(
        imgSecFile.tempFilePath,
        {
          folder: "vinos",
          resource_type: "auto",
        }
      );
      imgSecUrl = imgSecUpload.secure_url;
    }

    if (!nombre || !titulo) {
      return res.status(400).send("Nombre y título son obligatorios");
    }

    const [result] = await pool.query(
      `INSERT INTO vinos (nombre, titulo, descripcion, resumen, varietal, fermentacion, crianza, subtitulo, img, imgsecundaria) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        nombre,
        titulo,
        descripcion || null,
        resumen || null,
        varietal || null,
        fermentacion || null,
        crianza || null,
        subtitulo || null,
        imgUrl || null,
        imgSecUrl || null,
      ]
    );

    const newVinoId = result.insertId;

    const [vino] = await pool.query("SELECT * FROM vinos WHERE id = ?", [
      newVinoId,
    ]);

    res.status(201).json(vino[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor: " + error.message);
  }
};

// ---------------------------------------- put vinos ------------------------------------------

export const putVinos = async (req, res) => {
  try {
    const {
      nombre,
      titulo,
      descripcion,
      resumen,
      varietal,
      fermentacion,
      crianza,
      subtitulo,
      id,
    } = req.body;

    let imgUrl = null;
    let imgSecUrl = null;

    if (req.files?.img) {
      const imgFile = Array.isArray(req.files.img)
        ? req.files.img[0]
        : req.files.img;
      const imgUpload = await cloudinary.uploader.upload(imgFile.tempFilePath, {
        folder: "vinos",
      });
      imgUrl = imgUpload.secure_url;
    }

    if (req.files?.imgsecundaria) {
      const imgSecFile = Array.isArray(req.files.imgsecundaria)
        ? req.files.imgsecundaria[0]
        : req.files.imgsecundaria;
      const imgSecUpload = await cloudinary.uploader.upload(
        imgSecFile.tempFilePath,
        {
          folder: "vinos",
          resource_type: "auto",
        }
      );
      imgSecUrl = imgSecUpload.secure_url;
    }

    const [result] = await pool.query(
      `UPDATE vinos SET 
        nombre = IFNULL(?, nombre), 
        titulo = IFNULL(?, titulo), 
        descripcion = IFNULL(?, descripcion), 
        resumen = IFNULL(?, resumen), 
        varietal = IFNULL(?, varietal), 
        fermentacion = IFNULL(?, fermentacion), 
        crianza = IFNULL(?, crianza), 
        subtitulo = IFNULL(?, subtitulo), 
        img = IFNULL(?, img), 
        imgsecundaria = IFNULL(?, imgsecundaria)
      WHERE id = ?`,
      [
        nombre,
        titulo,
        descripcion,
        resumen,
        varietal,
        fermentacion,
        crianza,
        subtitulo,
        imgUrl,
        imgSecUrl,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("El vino no existe o no se actualizó");
    }

    const [vino] = await pool.query("SELECT * FROM vinos WHERE id = ?", [id]);

    res.status(200).json(vino[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor: " + error);
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
