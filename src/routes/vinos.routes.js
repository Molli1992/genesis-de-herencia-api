import { Router } from "express";
import {
  getVinos,
  postVinos,
  putVinos,
  deleteVinos,
} from "../controllers/vinos.controllers.js";

const router = Router();

router.get("/vinos", getVinos);

router.post("/vinos", postVinos);

router.put("/vinos", putVinos);

router.delete("/vinos/:nombre", deleteVinos);

export default router;
