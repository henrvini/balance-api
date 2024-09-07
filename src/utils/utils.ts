import { DepositResponseDTO, NegativeResponseDTO, WithdrawResponseDTO } from "../dto/Event";

export const isNegativeResponse = (
    result: DepositResponseDTO | WithdrawResponseDTO | NegativeResponseDTO
): result is NegativeResponseDTO => {
    return (result as NegativeResponseDTO).error !== undefined;
};
