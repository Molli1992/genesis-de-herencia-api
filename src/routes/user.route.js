import { Router } from "express";
import {
  getUsuarios,
  postUsuarios,
  putUsers,
  deleteUsers,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/admin", getUsuarios);

router.post("/admin", postUsuarios);

router.put("/admin", putUsers);

router.delete("/admin/:usuario", deleteUsers);

export default router;
