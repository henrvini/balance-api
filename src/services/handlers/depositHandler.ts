import { DepositDTO, DepositResponseDTO } from "../../dto/Event";
import { updateAccount, getAccountById } from "../accountService";

export const deposit = ({ destination, amount }: DepositDTO): DepositResponseDTO => {
    const account = getAccountById(destination);

    if (!account) {
        const newAccountBalance = updateAccount({ id: destination, balance: amount });

        return { destination: newAccountBalance };
    } else {
        const newAccountBalance = updateAccount({
            id: destination,
            balance: account.balance + amount,
        });

        return { destination: newAccountBalance };
    }
};
