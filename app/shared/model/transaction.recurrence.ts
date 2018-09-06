import { Transaction } from "./transaction";

export class TransactionRecurrence {
    constructor(public id: number, public transaction: Transaction, public start: Date, public end: Date, public everyAmount: number, public everyUnit: number) {

    }
}