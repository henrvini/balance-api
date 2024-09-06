import { Account } from "../models/Account";
import { accounts } from "./accountService";

export const createFakeAccount = (): void => {
    const fakeAccount_01: Account = { id: "100", balance: 20 };
    const fakeAccount_02: Account = { id: "300", balance: 0 };

    accounts.set(fakeAccount_01.id, fakeAccount_01);
    accounts.set(fakeAccount_02.id, fakeAccount_02);
};

export const cleanUppAllAccounts = (): void => {
    accounts.clear();
};
