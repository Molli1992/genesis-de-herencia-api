import { Router } from "express";
import {
  getUsuarios,
  login,
  postUsuarios,
  putUsers,
  deleteUsers,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/admin", getUsuarios);

router.get("/admin/:user/:password", login);

router.post("/admin", postUsuarios);

router.put("/admin", putUsers);

router.delete("/admin/:usuario", deleteUsers);

export default router;
