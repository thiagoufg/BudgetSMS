import { Acc } from "./account";
import { Place } from "./place";

export class Transaction {

    constructor(
        public id: number = null,
        public place: Place = null,
        public value: number = null,
        public date: Date = null,
        public account: Acc = null
    ) {
        
    }
}