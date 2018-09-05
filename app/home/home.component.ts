import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TransactionService } from "~/shared/services/transaction.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    currentValue: number = 0;
    constructor(transactionService: TransactionService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    type(num: number) {
        this.currentValue = this.currentValue * 10 + num/100;
    }

    erase() {
        this.currentValue = (this.currentValue * 100 - (this.currentValue * 100 % 10)) / 1000;
    }

    save() {
    }
}
