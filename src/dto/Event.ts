import { Account } from "../models/Account";

export enum EventType {
    deposit = "deposit",
}

export interface DepositDTO {
    type: string;
    destination: string;
    amount: number;
}

export type DepositResponseDTO = { destination: Account };
