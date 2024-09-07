interface account {
    money: number;
    deposit: (value: number) => void
}

let bankAccount: account = {
    money: 2000,
    deposit(value): void {
        this.money += value;
    }
};

interface person {
    name: string;
    bankAccount: account;
    hobbies: string[];
}

let myself: person = {
    name: "John",
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
};

myself.bankAccount.deposit(3000);
console.log(myself);