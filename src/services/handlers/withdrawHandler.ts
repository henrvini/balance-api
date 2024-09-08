import { WithdrawDTO, WithdrawResponseDTO } from "../../dto/Event";
import { HttpError, HttpErrorMessage } from "../../utils/utils";
import { updateAccount, getAccountById, checkFundsForTransaction } from "../accountService";

export const withdraw = ({ origin, amount }: WithdrawDTO): WithdrawResponseDTO => {
    const account = getAccountById(origin);

    if (!account) {
        throw new HttpError(HttpErrorMessage.ACCOUNT_NOT_FOUND, 404);
    }

    if (!checkFundsForTransaction(account.balance, amount)) {
        throw new HttpError(HttpErrorMessage.INSUFFICIENT_BALANCE, 422);
    }

    const newAccountBalance = updateAccount({
        id: origin,
        balance: account.balance - amount,
    });

    return { origin: newAccountBalance };
};
