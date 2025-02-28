import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const HOST = process.env.DB_HOST;
export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASSWORD;
export const DBPORT = process.env.DB_PORT;
export const DATABASE = process.env.DB_DATABASE;
export const UserNODEMAILER = process.env.USER_NODEMAILER;
export const PassNODEMAILER = process.env.PASS_NODEMAILER;
export const ToEmailNODEMAILER = process.env.TO_EMAIL_NODEMAILER;
export const ToEmailNODEMAILER2 = process.env.TO_EMAIL_NODEMAILER_2;
export const CloudinatyCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const CloudinatyApiKey = process.env.CLOUDINARY_API_KEY;
export const CloudinatyApiSecret = process.env.CLOUDINARY_API_SECRET;
