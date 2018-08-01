import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "./modal-view";
import { DataBase } from '../sqlite/db';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListPicker } from "ui/list-picker";
import * as app from "application";

@Component({
    selector: "Browse",
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    public transactions: Array<any>;
    public selectedDate: Date;
    
    constructor(public db: DataBase, private modalService: ModalDialogService, private vcRef: ViewContainerRef) {
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
        this.db.execWithParams("INSERT into transactions (name, value, date, id_user, id_account, id_category) VALUES (?,?,?,?,?,?)", ["Nic",10,10000,1,1,1]).then
        (
            id => 
            {
                console.log("INSERT RESULT", id);
                this.fetch();
            }, 
            error => 
            {
                console.log("INSERT ERROR", error);
            }
        );
    }
 
    public fetch() {
        this.db.all("SELECT * from transactions").then
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
                            "id_user": rows[row][4],
                            "id_account": rows[row][5],
                            "id_category": rows[row][6]
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
