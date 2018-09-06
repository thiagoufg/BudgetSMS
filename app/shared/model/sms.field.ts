import { SmsFieldType } from "./sms.field.type";

export class SmsField {
    constructor(public id: number, public order: number, public label: string, public type: SmsFieldType) {
        
    }
}