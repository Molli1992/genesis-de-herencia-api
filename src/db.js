import { createPool } from "mysql2/promise";
import { HOST, USER, PASSWORD, DBPORT, DATABASE } from "./config.js";

export const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: DBPORT,
  database: DATABASE,
});
