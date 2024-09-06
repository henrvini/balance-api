import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";

export const validateAccountId = [
    query("account_id")
        .isString()
        .withMessage("account_id must be a string")
        .notEmpty()
        .withMessage("account_id cannot be empty"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];
