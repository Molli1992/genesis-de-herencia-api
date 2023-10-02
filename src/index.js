import express from "express";
import vinosRoutes from "./routes/vinos.routes.js";

const app = express();

app.use(express.json());
app.use("/api", vinosRoutes);

app.listen(3000);
console.log("Server running on port 3000");
