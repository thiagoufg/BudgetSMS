import { Component } from '@angular/core';
var Sqlite = require("nativescript-sqlite");
@Component
(
    {
        selector:"",
        templateUrl:"modules/sms/sms-pattern-list.html"
    }
)
export class SmsPatternList 
{

    public db: any;
    public people: Array<any>;

    public constructor()
    {
        this.connect("BudgetSMS.db");
    }

    public connect(dbname: string)
    {
        if(dbname===null)
        {
            dbname="BudgetSMS.db";
        }
        if (!Sqlite.exists(dbname)) {
            //Sqlite.copyDatabase(dbname);
        }
        (new Sqlite(dbname)).then
        (
            db => 
            {
                db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then
                (
                    id => 
                    {
                        this.db = db;
                    }, 
                    error => 
                    {
                        console.log("CREATE TABLE ERROR", error);
                    }
                );
            }, 
            error => 
            {
                console.log("OPEN DB ERROR", error);
            }
        );
    }

    public insert() {
        this.db.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }
 
    public fetch() {
        this.db.all("SELECT * FROM people").then(rows => {
            this.people = [];
            for(var row in rows) {
                this.people.push({
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}