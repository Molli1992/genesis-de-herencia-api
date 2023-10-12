import { Router } from "express";
import {
  getMessage,
  postMessage,
  putMessage,
} from "../controllers/message.controllers.js";

const router = Router();

router.get("/message", getMessage);

router.post("/message", postMessage);

router.put("/message", putMessage);

export default router;
