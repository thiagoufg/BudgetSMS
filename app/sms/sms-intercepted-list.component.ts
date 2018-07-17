import { OnInit } from '@angular/core';
import { DataBase } from '../sqlite/db';
import { Component } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application";

@Component
(
    {
        selector:"",
        moduleId: module.id,
        templateUrl:"./sms-intercepted-list.component.html"
    }
)
export class SmsInterceptedList implements OnInit
{

    public transactions: Array<any>;

    public constructor(public db: DataBase)
    {
        this.db.connect("BudgetSMS.db");
    }

    public ngOnInit()
    {
        this.fetch();
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