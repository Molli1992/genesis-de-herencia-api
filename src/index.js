import express from "express";
import vinosRoutes from "./routes/vinos.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", vinosRoutes);

app.listen(3001);
console.log("Server running on port 3001");
