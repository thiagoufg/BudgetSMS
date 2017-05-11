import { OnInit } from '@angular/core';
import { DataBase } from '../shared/utils/SQLite';
import { Component } from '@angular/core';
@Component
(
    {
        selector:"",
        templateUrl:"modules/sms/sms-pattern-list.html"
    }
)
export class SmsPatternList implements OnInit
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

    public remove(item)
    {
        this.db.execWithParams("DELETE FROM transactions where name=? and amount=?", [item.name, item.amount]).then
        (
            res => 
            {
                console.log("DELETE RESULT", res);
                this.fetch();
            }, 
            error => 
            {
                console.log("DELETE ERROR", error);
            }
        );
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
}