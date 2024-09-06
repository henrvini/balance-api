import { Account } from "../models/Account";

export const accounts: Map<string, Account> = new Map();

export const getAccountById = (accountId: string): Account | undefined => {
    return accounts.get(accountId);
};
