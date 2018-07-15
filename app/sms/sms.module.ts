import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SmsRoutingModule } from "./sms-routing.module";
import { SmsListComponent } from "./sms-list.component";
import { SmsPatternList } from "./sms-pattern-list.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        SmsRoutingModule
    ],
    declarations: [
        SmsListComponent, SmsPatternList
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SmsModule { }
