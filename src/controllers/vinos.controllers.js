import { pool } from "../db.js";

export const getVinos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vinos");
    res.status(202).send(rows);
  } catch (error) {
    res.status(404).send(error);
  }
};

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
    } = req.body;

    if (
      !nombre ||
      !titulo ||
      !descripcion ||
      !resumen ||
      !varietal ||
      !fermentacion ||
      !crianza
    ) {
      res.status(404).send("Falta enviar datos obligatorios");
    } else {
      const [rows] = await pool.query(
        `INSERT INTO vinos (nombre,  titulo, descripcion, resumen, varietal, fermentacion, crianza) VALUES(?, ?, ?, ?, ?, ?, ?) `,
        [nombre, titulo, descripcion, resumen, varietal, fermentacion, crianza]
      );

      res.status(202).send(`Vino creado correctamente ${{ rows }}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const postVinosImg = (req, res) => {
  pool.query(
    //`INSERT INTO vinos (img) VALUES(?) `,
    []
  );
  console.log(req.body);
  res.status(202).send("Imagen cargada correctamente");
};

export const putVinos = (req, res) => {};

export const deleteVinos = (req, res) => {};
