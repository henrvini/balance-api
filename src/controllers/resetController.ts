import { Request, Response } from "express";
import { cleanUppAllAccounts } from "../services/resetService";

export const reset = async (req: Request, res: Response) => {
    try {
        cleanUppAllAccounts();
        res.status(200).send('OK');
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
