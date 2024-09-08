export class HttpError extends Error {
    public statusCode: number;

    constructor(msg: string, statusCode: number) {
        super(msg);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export enum HttpErrorMessage {
    INSUFFICIENT_BALANCE = "Insufficient balance",
    ACCOUNT_NOT_FOUND = "Account not found",
}
