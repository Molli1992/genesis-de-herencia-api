import { Router } from "express";
import { getUsuarios, postUsuarios } from "../controllers/user.controllers.js";

const router = Router();

router.get("/admin", getUsuarios);

router.post("/admin", postUsuarios);

export default router;
