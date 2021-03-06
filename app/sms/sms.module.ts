import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SmsRoutingModule } from "./sms-routing.module";
import { SmsPatternListComponent } from "./sms-pattern-list.component";
import { SmsInterceptedList } from "./sms-intercepted-list.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        SmsRoutingModule
    ],
    declarations: [
        SmsPatternListComponent, SmsInterceptedList
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SmsModule { }
