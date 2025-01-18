import { Bank } from "../src/bank";
import {AccountType} from "../src/types";

const accounts = [{id: 1234567890, balance: 5000},
    {id: 1234567891, balance: 10000}];
const username : string[] = ['user1', 'user2'];
const bank: Bank = new Bank(accounts, username);


// Scenario 1: successful account created
const acc: AccountType = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892 || acc.balance !== 0 || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('Scenario 1 failed');
}
catch(e) {
    console.log('Scenario 1 passed');
}

// Scenario 2: Unsuccessful account creation due to customer being under 18
try {
    bank.createAccount('user1', 17, 1234567899)
    console.log('Scenario 2 failed')
} catch (e){
    console.log('Scenario 2 passed')
}

// Scenario 3: Unsuccessful account creation due to invalid username
try {
    bank.createAccount('user3', 20, 1234567892)
    console.log('Scenario 3 failed')
} catch (e){
    console.log('Scenario 3 passed')
}


