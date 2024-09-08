import { NextFunction, Request, Response } from "express";
import { check, query, validationResult } from "express-validator";
import { EventType } from "../dto/Event";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const validateAccountId = [
    query("account_id")
        .isString()
        .withMessage("account_id must be a string")
        .notEmpty()
        .withMessage("account_id cannot be empty"),
    handleValidationErrors,
];

export const validateEvent = [
    check("type").isIn(Object.values(EventType)).withMessage("Invalid transaction type"),
    handleValidationErrors,
];
