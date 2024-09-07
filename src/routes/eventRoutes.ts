import { Router } from "express";
import { eventHandler } from "../controllers/eventController";

const router = Router();

// TODO: POST transfer and new account
router.post("/event", eventHandler);

export default router;
