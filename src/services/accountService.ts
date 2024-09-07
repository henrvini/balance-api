import { Account } from "../models/Account";

export const accounts: Map<string, Account> = new Map();

export const getAccountById = (accountId: string): Account | undefined => {
    return accounts.get(accountId);
};

export const updateAccount = (account: Account): Account => {
    accounts.set(account.id, account);

    return account;
};
