import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SmsPatternListComponent } from "./sms-pattern-list.component";
import { SmsInterceptedList } from "./sms-intercepted-list.component";


const routes: Routes = [
    { path: "pattern", component: SmsPatternListComponent },
    { path: "intercepted", component: SmsInterceptedList },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SmsRoutingModule { }
