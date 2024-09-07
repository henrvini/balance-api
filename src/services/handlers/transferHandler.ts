import { NegativeResponseDTO, TransferDTO, TransferResponseDTO } from "../../dto/Event";
import { updateAccount, getAccountById, checkFundsForTransaction } from "../accountService";

export const transfer = ({
    origin,
    destination,
    amount,
}: TransferDTO): TransferResponseDTO | NegativeResponseDTO => {
    const originAccount = getAccountById(origin);
    const destinationAccount = getAccountById(destination);

    if (!originAccount) {
        return { statusCode: 404, error: "Account not found" };
    }

    if (checkFundsForTransaction(originAccount.balance, amount)) {
        const newOriginAccountBalance = updateAccount({
            id: origin,
            balance: originAccount.balance - amount,
        });

        const newDestinationAccountBalance = updateAccount({
            id: destination,
            balance: destinationAccount ? destinationAccount.balance + amount : amount,
        });

        return { origin: newOriginAccountBalance, destination: newDestinationAccountBalance };
    }
    return { statusCode: 403, error: "Insufficient balance" };
};
