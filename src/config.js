import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const HOST = process.env.DB_HOST;
export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASSWORD;
export const DBPORT = process.env.DB_PORT;
export const DATABASE = process.env.DB_DATABASE;
