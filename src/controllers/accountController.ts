import { Request, Response } from "express";
import { getAccountById, createFakeAccount } from "../services/accountService";

export const reset = async (req: Request, res: Response) => {
    try {
        createFakeAccount();
        res.status(200).json("OK");
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};

export const getBalance = async (req: Request, res: Response) => {
    try {
        const account_id = req.query.account_id as string;

        const account = getAccountById(account_id);

        if (account) {
            res.status(200).json(account.balance);
        } else {
            res.status(404).json(0);
        }
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
