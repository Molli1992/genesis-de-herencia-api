import { Router } from "express";
import {
  getVinos,
  postVinos,
  putVinos,
  deleteVinos,
  postVinosImg,
} from "../controllers/vinos.controllers.js";

const router = Router();

router.get("/vinos", getVinos);

router.post("/vinos", postVinos);

router.post("/vinos/img", postVinosImg);

router.put("/vinos", putVinos);

router.delete("/vinos", deleteVinos);

export default router;
