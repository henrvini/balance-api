import { accounts } from "../../data/inMemoryDb";
import { Account } from "../../models/Account";
import { checkFundsForTransaction, getAccountById, updateAccount } from "../accountService";

beforeEach(() => {
    accounts.clear();
});

describe("getAccountById", () => {
    it("should return an account if it exists", () => {
        const mockedAccount: Account = { id: "100", balance: 10 };

        accounts.set(mockedAccount.id, mockedAccount);

        const result = getAccountById("100");
        expect(result).toStrictEqual(mockedAccount);
    });

    it("should return undefined if the account does not exist", () => {
        const result = getAccountById("100");
        expect(result).toBeUndefined();
    });
});

describe("updateAccount", () => {
    it("should create/update account and return it", () => {
        const mockedAccount: Account = { id: "100", balance: 10 };
        const result = updateAccount(mockedAccount);

        expect(result).toEqual(mockedAccount);
        expect(accounts.get("100")).toStrictEqual(mockedAccount);
    });
});

describe("checkFundsForTransaction", () => {
    it("should check funds and return true if sufficient funds", () => {
        const currentFunds = 100;
        const amountToBeTransfered = 50;

        const result = checkFundsForTransaction(currentFunds, amountToBeTransfered);

        expect(result).toBeTruthy();
    });

    it("should check funds and return false if insufficient funds", () => {
        const currentFunds = 20;
        const amountToBeTransfered = 50;

        const result = checkFundsForTransaction(currentFunds, amountToBeTransfered);

        expect(result).toBeFalsy();
    });
});
