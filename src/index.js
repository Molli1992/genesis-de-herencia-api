import express from "express";
import vinosRoutes from "./routes/vinos.routes.js";
import userRoutes from "./routes/user.route.js";
import sendEmailRoutes from "./routes/sendEmail.route.js"
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

app.use(express.json({ limit: "100000kb" }));
app.use(express.urlencoded({ limit: "100000kb", extended: true }));
app.use(cors());
app.use("/api", vinosRoutes);
app.use("/api", userRoutes);
app.use("/api", sendEmailRoutes);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
