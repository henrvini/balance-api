import { accounts } from "../../../data/inMemoryDb";
import { EventType, TransferDTO, TransferResponseDTO } from "../../../dto/Event";
import { Account } from "../../../models/Account";
import { HttpError, HttpErrorMessage } from "../../../utils/utils";
import { transfer } from "../transferHandler";

beforeEach(() => {
    accounts.clear();
});

describe("transfer", () => {
    it("should transfer from one existent account to another existent account", () => {
        const mockedTransferDTO: TransferDTO = {
            type: EventType.TRANSFER,
            origin: "100",
            destination: "300",
            amount: 15,
        };
        const mockedExistingOriginAccount: Account = { id: "100", balance: 100 };
        const mockedExistingDestinationAccount: Account = { id: "300", balance: 50 };

        accounts.set(mockedExistingOriginAccount.id, mockedExistingOriginAccount);
        accounts.set(mockedExistingDestinationAccount.id, mockedExistingDestinationAccount);

        const mockedTransferResponseDTO: TransferResponseDTO = {
            origin: {
                id: "100",
                balance: mockedExistingOriginAccount.balance - mockedTransferDTO.amount,
            },
            destination: {
                id: "300",
                balance: mockedExistingDestinationAccount.balance + mockedTransferDTO.amount,
            },
        };

        jest.mock("../../accountService", () => {
            return jest
                .fn()
                .mockReturnValueOnce(mockedExistingOriginAccount)
                .mockReturnValueOnce(mockedExistingDestinationAccount);
        });

        const result = transfer(mockedTransferDTO);

        expect(result).toStrictEqual(mockedTransferResponseDTO);
    });

    it("should transfer from one existent account to another non-existent", () => {
        const mockedTransferDTO: TransferDTO = {
            type: EventType.TRANSFER,
            origin: "100",
            destination: "300",
            amount: 15,
        };
        const mockedExistingOriginAccount: Account = { id: "100", balance: 100 };

        accounts.set(mockedExistingOriginAccount.id, mockedExistingOriginAccount);

        const mockedTransferResponseDTO: TransferResponseDTO = {
            origin: {
                id: "100",
                balance: mockedExistingOriginAccount.balance - mockedTransferDTO.amount,
            },
            destination: {
                id: "300",
                balance: mockedTransferDTO.amount,
            },
        };

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedExistingOriginAccount);
        });

        const result = transfer(mockedTransferDTO);

        expect(result).toStrictEqual(mockedTransferResponseDTO);
    });

    it("should throw HttpError if origin account does not exist", () => {
        const mockedTransferDTO: TransferDTO = {
            type: EventType.TRANSFER,
            origin: "100",
            destination: "300",
            amount: 15,
        };

        const mockedNonExistingOriginAccount = undefined;

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedNonExistingOriginAccount);
        });

        expect(() => transfer(mockedTransferDTO)).toThrow(HttpError);
        expect(() => transfer(mockedTransferDTO)).toThrow(
            new HttpError(HttpErrorMessage.ACCOUNT_NOT_FOUND, 404)
        );
    });

    it("should throw HttpError if origin account does not have sufficient funds", () => {
        const mockedTransferDTO: TransferDTO = {
            type: EventType.TRANSFER,
            origin: "100",
            destination: "300",
            amount: 15,
        };

        const mockedExistingOriginAccount: Account = { id: "100", balance: 10 };

        accounts.set(mockedExistingOriginAccount.id, mockedExistingOriginAccount);

        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedExistingOriginAccount);
        });

        expect(() => transfer(mockedTransferDTO)).toThrow(HttpError);
        expect(() => transfer(mockedTransferDTO)).toThrow(
            new HttpError(HttpErrorMessage.INSUFFICIENT_BALANCE, 422)
        );
    });
});
