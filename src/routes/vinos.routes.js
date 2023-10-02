import { Router } from "express";
import {
  getVinos,
  postVinos,
  putVinos,
  deleteVinos,
} from "../controllers/vinos.controllers.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/vinos", getVinos);

router.post("/vinos", upload.single("imagen"), postVinos);

router.put("/vinos", putVinos);

router.delete("/vinos", deleteVinos);

export default router;
