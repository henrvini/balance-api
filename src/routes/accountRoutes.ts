import { Router } from "express";
import { getBalance } from "../controllers/accountController";
import { validateAccountId } from "../middleware/validateAccountId";

const router = Router();

router.get("/balance", validateAccountId, getBalance);

// TODO: POST deposit, withdraw, transfer and new account
router.get("/event");

export default router;
