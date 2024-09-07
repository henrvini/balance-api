import { Router } from "express";
import { getBalance } from "../controllers/accountController";
import { validateAccountId } from "../middleware/validators";

const router = Router();

router.get("/balance", validateAccountId, getBalance);

export default router;
