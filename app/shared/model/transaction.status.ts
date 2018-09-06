import { Transaction } from "./transaction";

export class TransactionStatus {
    constructor(public id: number, public transaction: Transaction, public recurrenceDate: Date) {
        
    }
}