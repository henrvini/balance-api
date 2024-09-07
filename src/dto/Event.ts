import { Account } from "../models/Account";

export enum EventType {
    deposit = "deposit",
    withdraw = "withdraw",
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

export interface NegativeResponseDTO {
    statusCode: number;
    error: string;
}

export type DepositResponseDTO = { destination: Account };
export type WithdrawResponseDTO = { origin: Account };
