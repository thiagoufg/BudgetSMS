import { Component, OnInit } from '@angular/core';
import { DataBase } from '../sqlite/db';
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
        this.db.connect("budget.db");
    }

    public ngOnInit()
    {
        this.fetch();
    }

    public insert() 
    {
        this.db.execWithParams("INSERT into transactions (name, value, date, id_user) VALUES (?, ?, ?, ?)", ["Nic", 10, 10000, 1]).then
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