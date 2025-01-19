import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can maintain existing accounts and create new accounts
 */
export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and user with usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * Finds a specific bank account based on the id provided.
     * @param id - The account id associated with the bank account.
     * @returns - true if account id exists, false otherwise.
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id == id);
    }

    /**
     * Ensures a provided account number has a valid length of 10 digits.
     * @param accountNumber - The account number to be checked for 10-digit length.
     * @returns - true if the length of accountNumber is 10, false otherwise.
     */
    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }

    /**
     * Checks to ensure a provided username exists in the bank's "usernames" list.
     * @param username - The username to be checked for existence.
     * @returns - true if the username exists in the bank's "usernames" list, false otherwise.
     */
    private isUsernameExists(username: string) : boolean {
        return this.usernames.includes(username);
    }

    /**
     * Creates a bank account with an initial balance of 0 only if the accountNumber length equals 10,
     *     the username exists in the bank's "usernames" list, age >= 18,
     *     and the accountNumber doesn't already exist.
     * @param username - The username to be used in the creation of the account. This username
     *     must exist in the bank's "usernames" list for an account to be created.
     * @param age - The age of the person creating the account. Must be >= 18 for an account to be created.
     * @param accountNumber The account number to be used. Must be a unique 10-digit number
     *     for an account to be created.
     * @returns - a new account with 10-digit id and 0 balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType{
        if (this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if (!this.isUsernameExists(username)) {
            throw new Error('User not found');
        }
        if (age < 18) {
            throw new Error('User is under 18');
        }
        if (this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }

        const account: AccountType = {
            id: accountNumber,
                balance: 0
        };
        this.accounts.push(account);
        return account;
    }

    /**
     * Deposits a number > 0 into a valid bank account.
     * @param accountNumber - The account number associated with the account you wish to deposit an amount into.
     *     Must be a valid account number stored in the bank's "accounts" list.
     * @param amountDeposited - The amount to be deposited in the account. Must be > 0.
     * @returns - The new balance of the account.
     */
    depositIntoAccount(accountNumber: number, amountDeposited: number) : number {
        if(amountDeposited <= 0) {
            throw new Error('Invalid deposit amount, must be greater than 0')
        }
        const account = this.findAccountById(accountNumber);
        if(!account) {
            throw new Error('Invalid account number, accountNumber: ' + accountNumber + ' does not exist')
        }
        account.balance += amountDeposited;
        return account.balance;
    }

    withdrawFromAccount(accountNumber: number, amountToWithdraw: number): number {
        const account = this.findAccountById(accountNumber);
        if(!account) {
            throw new Error('Invalid account number, accountNumber: ' + accountNumber + ' does not exist');
        }
        if(amountToWithdraw <= 0 || amountToWithdraw > account.balance) {
            throw new Error('Invalid withdrawal amount');
        }
        account.balance -= amountToWithdraw;
        return account.balance;
    }
}