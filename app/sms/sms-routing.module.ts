import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SmsListComponent } from "./sms-list.component";
import { SmsPatternList } from "./sms-pattern-list.component";


const routes: Routes = [
    { path: "", component: SmsListComponent },
    { path: "pattern", component: SmsPatternList },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SmsRoutingModule { }
