import { Request, Response } from "express";
import { cleanUpAllAccounts } from "../services/resetService";

export const reset = async (req: Request, res: Response) => {
    try {
        cleanUpAllAccounts();
        res.status(200).send("OK");
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
