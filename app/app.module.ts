import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DataBase } from './sqlite/db';
import { TransactionService } from "~/shared/services/transaction.service";
import { TransactionDao } from "./shared/dao/transaction.dao";
import { ModalViewComponent } from "./browse/modal-view";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent, ModalViewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [DataBase, ModalDialogService, TransactionService, TransactionDao],
    entryComponents: [ModalViewComponent]
})
export class AppModule { }
