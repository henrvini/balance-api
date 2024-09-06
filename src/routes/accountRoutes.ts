import { Router } from "express";
import { getBalance, reset } from "../controllers/accountController";
import { validateAccountId } from "../middleware/validateAccountId";

const router = Router();

router.post("/reset", reset);

router.get("/balance", validateAccountId, getBalance);

// TODO: POST deposit, withdraw, transfer and new account
router.get("/event");

export default router;
