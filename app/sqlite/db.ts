import { Injectable } from '@angular/core';
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DataBase 
{
    public db: any;
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
                this.db = db;
                this.checkDbUpdate();
            }, 
            error => 
            {
                console.log("OPEN DB ERROR", error);
            }
        );
    }

    public checkDbUpdate()
    {
        this.exec("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount TEXT)").then
        (
            id => 
            {
                console.log("TABLE TRANSACTIONS CREATED SUCESSFULLY.")
            }, 
            error => 
            {
                console.log("CREATE TABLE ERROR", error);
            }
        );
    }

    public exec(sql: string): Promise<Object>
    {
        return this.db.execSQL(sql);
    }

    public execWithParams(sql: string, params: string[]): Promise<Object>
    {
        return this.db.execSQL(sql,params);
    }

    public all(sql: string): Promise<Object>
    {
        return this.db.all(sql);
    }
}