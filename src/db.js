import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "felipe1992",
  port: 3306,
  database: "genesisdeherencias",
});
