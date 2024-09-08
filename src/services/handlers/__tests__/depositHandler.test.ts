import { accounts } from "../../../data/inMemoryDb";
import { DepositDTO, DepositResponseDTO, EventType } from "../../../dto/Event";
import { Account } from "../../../models/Account";
import { deposit } from "../depositHandler";

beforeEach(() => {
    accounts.clear();
});

describe("deposit", () => {
    it("should create an account if not exists and deposit amount", () => {
        const mockedNonExistentAccount = undefined;
        const mockedDepositDTO: DepositDTO = {
            type: EventType.DEPOSIT,
            destination: "100",
            amount: 10,
        };
        const mockedDepositResponseDTO: DepositResponseDTO = {
            destination: { id: "100", balance: 10 },
        };
        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedNonExistentAccount);
        });

        const result = deposit(mockedDepositDTO);

        expect(result).toStrictEqual(mockedDepositResponseDTO);
    });

    it("should update an account if exists and deposit amount", () => {
        const mockedExistingAccount: Account = { id: "50", balance: 100 };

        accounts.set(mockedExistingAccount.id, mockedExistingAccount);

        const mockedDepositDTO: DepositDTO = {
            type: EventType.DEPOSIT,
            destination: "50",
            amount: 10,
        };
        const mockedDepositResponseDTO: DepositResponseDTO = {
            destination: {
                id: "50",
                balance: mockedExistingAccount.balance + mockedDepositDTO.amount,
            },
        };
        jest.mock("../../accountService", () => {
            return jest.fn().mockReturnValue(mockedExistingAccount);
        });

        const result = deposit(mockedDepositDTO);

        expect(result).toStrictEqual(mockedDepositResponseDTO);
    });
});
