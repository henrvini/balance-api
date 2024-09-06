import { Account } from "../models/Account";

const accounts: Map<string, Account> = new Map();

export const createFakeAccount = (): void => {
    const fakeAccount_01: Account = { id: "100", balance: 20 };
    const fakeAccount_02: Account = { id: "300", balance: 0 };

    accounts.set(fakeAccount_01.id, fakeAccount_01);
    accounts.set(fakeAccount_02.id, fakeAccount_02);
};

export const getAccountById = (accountId: string): Account | undefined => {
    return accounts.get(accountId);
};
