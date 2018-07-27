import { Component, OnInit } from "@angular/core";
import { DataBase } from '../sqlite/db';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListPicker } from "ui/list-picker";
import * as app from "application";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    public transactions: Array<any>;
    public selectedMonth;
    public months;
    public selectedYear;
    public years;
    public showMonthPicker: boolean = false;
    public showYearPicker: boolean = false;
    
    constructor(public db: DataBase) {
        this.db.connect("BudgetSMS.db");
        this.selectedMonth = (new Date()).getMonth();
        this.months = [1,2,3,4,5,6,7,8,9,10,11,12];
        this.selectedYear = (new Date()).getFullYear();
        this.years = Array.apply(null, {length: 100}).map((value,index)=>{return this.selectedYear - 50 + index});
    }

    ngOnInit(): void {
        this.fetch();
    }

    public selectedYearIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.selectedYear = picker.selectedIndex;
    }

    public selectedMonthIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.selectedMonth = picker.selectedIndex;
    }

    public insert() 
    {
        this.db.execWithParams("INSERT INTO transactions (name, amount) VALUES (?, ?)", ["Nic", "Raboy"]).then
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
        this.db.all("SELECT * FROM transactions").then
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
                            "amount": rows[row][2]
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
