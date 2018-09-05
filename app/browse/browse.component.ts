import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "./modal-view";
import { DataBase } from '../sqlite/db';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListPicker } from "ui/list-picker";
import * as app from "application";
import { TransactionService } from '../shared/services/transaction.service';
import { Transaction } from '../shared/model/transaction';

@Component({
    selector: "Browse",
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    public transactions: Array<any>;
    public selectedDate: Date;
    
    constructor(public db: DataBase, private modalService: ModalDialogService, private vcRef: ViewContainerRef,
        public transactionService: TransactionService
    ) {
        this.db.connect("budget.db");
        this.selectedDate = new Date();
    }

    ngOnInit(): void {
        this.fetch();
    }

    getDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.selectedDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    private createModelView(): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };

        return this.modalService.showModal(ModalViewComponent, options);
    }

    private handleError(error: any) {
        this.selectedDate = new Date();
        alert("Please try again!");
        console.dir(error);
    }

    private validate(result: any) {
        return !!result;
    }

    public insert() 
    {
        const tr = new Transaction();
        tr.value = 123;
        this.transactionService.add(tr).then
        (
            id => 
            {
                this.fetch();
            }, 
            error => 
            {
                alert("Error: " + error);
            }
        );
    }
 
    public fetch() {
        this.transactionService.list({}).then
        (
            rows => 
            {
                this.transactions = [];
                for(var row in rows) 
                {
                    this.transactions.push
                    (
                        {
                            "name": rows[row][1],
                            "value": rows[row][2],
                            "date": rows[row][3],
                            "id_user": rows[row][4]
                        }
                    );
                }
            }, 
            error => 
            {
                console.log("SELECT ERROR", error);
            }
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
