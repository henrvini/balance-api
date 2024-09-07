import { Request, Response } from "express";
import { deposit } from "../services/handlers/depositHandler";
import { EventType } from "../dto/Event";

export const eventHandler = async (req: Request, res: Response) => {
    try {
        const type = req.body.type as EventType;

        const strategies = {
            deposit,
        };

        const result = strategies[type](req.body);

        res.status(200).json(result);
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
