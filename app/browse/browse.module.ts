import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { ModalViewComponent } from "./modal-view";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule
    ],
    declarations: [
        BrowseComponent, ModalViewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ModalViewComponent]
})
export class BrowseModule { }
