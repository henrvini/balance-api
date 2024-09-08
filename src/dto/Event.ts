import { Account } from "../models/Account";

export enum EventType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer",
}

export interface DepositDTO {
    type: string;
    destination: string;
    amount: number;
}

export interface WithdrawDTO {
    type: string;
    origin: string;
    amount: number;
}

export interface TransferDTO {
    type: string;
    origin: string;
    amount: number;
    destination: string;
}

export type DepositResponseDTO = { destination: Account };
export type WithdrawResponseDTO = { origin: Account };
export type TransferResponseDTO = { origin: Account; destination: Account };
