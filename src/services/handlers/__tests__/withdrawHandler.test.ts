import { accounts } from "../../../data/inMemoryDb";
import { EventType, WithdrawDTO, WithdrawResponseDTO } from "../../../dto/Event";
import { Account } from "../../../models/Account";
import { HttpError, HttpErrorMessage } from "../../../utils/utils";
import { withdraw } from "../withdrawHandler";

beforeEach(() => {
    accounts.clear();
});

describe("withdraw", () => {
    it("should withdraw from one existent account", () => {
        const mockedWithdrawDTO: WithdrawDTO = {
            type: EventType.WITHDRAW,
            origin: "100",
            amount: 10,
        };
        const mockedExistingAccount: Account = { id: "100", balance: 10 };

        accounts.set(mockedExistingAccount.id, mockedExistingAccount);

        const mockedWithdrawResponseDTO: WithdrawResponseDTO = {
            origin: {
                id: "100",
                balance: mockedExistingAccount.balance - mockedWithdrawDTO.amount,
            },
        };

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedExistingAccount);
        });

        const result = withdraw(mockedWithdrawDTO);

        expect(result).toStrictEqual(mockedWithdrawResponseDTO);
    });

    it("should throw HttpError if account does not exist", () => {
        const mockedWithdrawDTO: WithdrawDTO = {
            type: EventType.WITHDRAW,
            origin: "100",
            amount: 10,
        };

        const mockedNonExistingOriginAccount = undefined;

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedNonExistingOriginAccount);
        });

        expect(() => withdraw(mockedWithdrawDTO)).toThrow(HttpError);
        expect(() => withdraw(mockedWithdrawDTO)).toThrow(
            new HttpError(HttpErrorMessage.ACCOUNT_NOT_FOUND, 404)
        );
    });

    it("should throw HttpError if account does not have sufficient funds", () => {
        const mockedWithdrawDTO: WithdrawDTO = {
            type: EventType.WITHDRAW,
            origin: "100",
            amount: 20,
        };
        const mockedExistingAccount: Account = { id: "100", balance: 10 };

        accounts.set(mockedExistingAccount.id, mockedExistingAccount);

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedExistingAccount);
        });

        expect(() => withdraw(mockedWithdrawDTO)).toThrow(HttpError);
        expect(() => withdraw(mockedWithdrawDTO)).toThrow(
            new HttpError(HttpErrorMessage.INSUFFICIENT_BALANCE, 422)
        );
    });
});
