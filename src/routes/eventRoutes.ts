import { Router } from "express";
import { eventHandler } from "../controllers/eventController";
import { validateEvent } from "../middleware/validators";

const router = Router();

// TODO: POST transfer and new account
router.post("/event", validateEvent, eventHandler);

export default router;
