import { Router } from "express";
import { eventHandler } from "../controllers/eventController";
import { validateEvent } from "../middleware/validators";

const router = Router();

router.post("/event", validateEvent, eventHandler);

export default router;
