import { accounts } from "../data/inMemoryDb";

export const cleanUpAllAccounts = (): void => {
    accounts.clear();
};
