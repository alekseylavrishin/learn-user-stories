export type AccountType = {
    id: number,
    balance: number
}

export interface BankType {
    createAccount(username: String, age: number, accountNumber: number): AccountType
    depositIntoAccount(accountNumber: number, amountDeposited: number) : number
    withdrawFromAccount(accountNumber: number, amountToWithdraw: number): number
}