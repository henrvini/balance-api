import { accounts } from "../../data/inMemoryDb";
import { Account } from "../../models/Account";
import { cleanUpAllAccounts } from "../resetService";

describe("cleanUpAllAccounts", () => {
    it("should clean up all account from in memory database", () => {
        const mockedAccount: Account = { id: "100", balance: 100 };

        accounts.set(mockedAccount.id, mockedAccount);

        cleanUpAllAccounts();

        expect(accounts.get("100")).toBeUndefined();
    });
});
