import { accounts } from "../data/inMemoryDb";

export const cleanUppAllAccounts = (): void => {
    accounts.clear();
};
