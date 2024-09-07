import { NegativeResponseDTO, WithdrawDTO, WithdrawResponseDTO } from "../../dto/Event";
import { updateAccount, getAccountById, checkFundsForTransaction } from "../accountService";

export const withdraw = ({
    origin,
    amount,
}: WithdrawDTO): WithdrawResponseDTO | NegativeResponseDTO => {
    const account = getAccountById(origin);

    if (!account) {
        return { statusCode: 404, error: "Account not found" };
    } else {
        if (checkFundsForTransaction(account.balance, amount)) {
            const newAccountBalance = updateAccount({
                id: origin,
                balance: account.balance - amount,
            });

            return { origin: newAccountBalance };
        }

        return { statusCode: 403, error: "Insufficient balance" };
    }
};
