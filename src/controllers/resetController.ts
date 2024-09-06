import { Request, Response } from "express";
import { createFakeAccount, cleanUppAllAccounts } from "../services/resetService";

export const reset = async (req: Request, res: Response) => {
    try {
        cleanUppAllAccounts();
        createFakeAccount();
        res.status(200).json("OK");
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
