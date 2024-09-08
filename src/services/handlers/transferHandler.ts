import { TransferDTO, TransferResponseDTO } from "../../dto/Event";
import { HttpError, HttpErrorMessage } from "../../utils/utils";
import { updateAccount, getAccountById, checkFundsForTransaction } from "../accountService";

export const transfer = ({ origin, destination, amount }: TransferDTO): TransferResponseDTO => {
    const originAccount = getAccountById(origin);
    const destinationAccount = getAccountById(destination);

    if (!originAccount) {
        throw new HttpError(HttpErrorMessage.ACCOUNT_NOT_FOUND, 404);
    }

    if (!checkFundsForTransaction(originAccount.balance, amount)) {
        throw new HttpError(HttpErrorMessage.INSUFFICIENT_BALANCE, 422);
    }

    const newOriginAccountBalance = updateAccount({
        id: origin,
        balance: originAccount.balance - amount,
    });

    const newDestinationAccountBalance = updateAccount({
        id: destination,
        balance: destinationAccount ? destinationAccount.balance + amount : amount,
    });

    return { origin: newOriginAccountBalance, destination: newDestinationAccountBalance };
};
