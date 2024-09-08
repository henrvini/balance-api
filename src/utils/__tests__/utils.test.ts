import { HttpError, HttpErrorMessage } from "../utils";

describe("HttpError", () => {
    it("should create an instance of HttpError with the correct message and status code", () => {
        const message = HttpErrorMessage.INSUFFICIENT_BALANCE;
        const statusCode = 401;
        const error = new HttpError(message, statusCode);

        expect(error).toBeInstanceOf(HttpError);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(statusCode);
    });
});

describe("HttpErrorMessage Enum", () => {
    it("should contain expected error messages", () => {
        expect(HttpErrorMessage.INSUFFICIENT_BALANCE).toBe("Insufficient balance");
        expect(HttpErrorMessage.ACCOUNT_NOT_FOUND).toBe("Account not found");
    });
});
