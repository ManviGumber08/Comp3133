export class Customer {
    private firstName: string;
    private lastName: string;
    private _age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
    }

    GetAge() {
        console.log(`I am ${this._age} years old.`);
    }
}
