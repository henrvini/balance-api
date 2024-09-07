import { Request, Response } from "express";
import { deposit } from "../services/handlers/depositHandler";
import { withdraw } from "../services/handlers/withdrawHandler";
import { EventType } from "../dto/Event";
import { isNegativeResponse } from "../utils/utils";
import { transfer } from "../services/handlers/transferHandler";

export const eventHandler = async (req: Request, res: Response) => {
    try {
        const type = req.body.type as EventType;

        const strategies = {
            [EventType.deposit]: deposit,
            [EventType.withdraw]: withdraw,
            [EventType.transfer]: transfer,
        };

        const result = strategies[type](req.body);

        const negativeResponse = isNegativeResponse(result);

        if (negativeResponse) {
            res.status(result.statusCode).json(0);
        } else {
            res.status(200).json(result);
        }
    } catch (err: unknown) {
        res.status(500).json({ msg: err instanceof Error ? err.message : "Unknown error" });
    }
};
