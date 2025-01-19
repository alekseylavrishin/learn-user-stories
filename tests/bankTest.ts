import { Bank } from "../src/bank";
import {AccountType} from "../src/types";

const accounts = [{id: 1234567890, balance: 5000},
    {id: 1234567891, balance: 10000}];
const username : string[] = ['user1', 'user2'];
const bank: Bank = new Bank(accounts, username);


console.log("Testing #1: Create a new account for existing customers in the bank")
// #1 Scenario 1: successful account created
const acc: AccountType = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892 || acc.balance !== 0 || acc.id.toString().length !== 10) {
    console.log('#1 Scenario 1 failed');
}
else {
    console.log('#1 Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('#1 Scenario 1 failed');
}
catch(e) {
    console.log('#1 Scenario 1 passed');
}

// #1 Scenario 2: Unsuccessful account creation due to customer being under 18
try {
    bank.createAccount('user1', 17, 1234567899)
    console.log('#1 Scenario 2 failed')
} catch (e){
    console.log('#1 Scenario 2 passed')
}

// #1 Scenario 3: Unsuccessful account creation due to invalid username
try {
    bank.createAccount('user3', 20, 1234567892)
    console.log('#1 Scenario 3 failed')
} catch (e){
    console.log('#1 Scenario 3 passed')
}

console.log("\nTesting #2: Deposit money into an account")
// #2 Scenario 1: Successful deposit into valid account
try {
    bank.depositIntoAccount(1234567892, 100);
    console.log('#2 Scenario 1 passed')
} catch (e) {
    console.log('#2 Scenario 1 failed')
}

// #2 Scenario 2: Unsuccessful deposit due to negative amount
try {
    bank.depositIntoAccount(1234567892, -1);
    console.log("#2 Scenario 2 failed")
} catch (e) {
    console.log("#2 Scenario 2 passed")
}

// #2 Scenario 2: Unsuccessful deposit due to amount of 0
try {
    bank.depositIntoAccount(1234567892, 0);
    console.log("#2 Scenario 2 failed")
} catch (e) {
    console.log("#2 Scenario 2 passed")
}

// #2 Scenario 3: Unsuccessful deposit due to invalid account number
try {
    bank.depositIntoAccount(9876543210, 100);
    console.log("#2 Scenario 3 failed")
} catch (e) {
    console.log("#2 Scenario 3 passed")
}

