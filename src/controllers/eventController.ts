import { Request, Response } from "express";
import { deposit } from "../services/handlers/depositHandler";
import { withdraw } from "../services/handlers/withdrawHandler";
import { EventType } from "../dto/Event";
import { HttpError } from "../utils/utils";
import { transfer } from "../services/handlers/transferHandler";

export const eventHandler = async (req: Request, res: Response) => {
    try {
        const type = req.body.type as EventType;

        const strategies = {
            [EventType.DEPOSIT]: deposit,
            [EventType.WITHDRAW]: withdraw,
            [EventType.TRANSFER]: transfer,
        };

        const result = strategies[type](req.body);

        res.status(201).json(result);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            res.status(err.statusCode).json(0);
        } else {
            res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
        }
    }
};
