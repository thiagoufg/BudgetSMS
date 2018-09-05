import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataBase } from '../../sqlite/db';
import { Transaction } from '../model/transaction';
import { Place } from '../model/place';
import { Acc } from '../model/account';

@Injectable()
export class TransactionDao {

    constructor(public db: DataBase) {
        if(!db) {
            this.db = new DataBase();
        }
        this.db.connect();
    };

    getById(id: number): Observable<any> {
        return null
    }

    list(filters: any): Promise<Object> {        
        return this.db.all("SELECT * from transactions").then
        (
            rows => 
            {
                return rows;
            }, 
            error => 
            {
                return error;
            }
        );
    }

    add(transaction: Transaction): Promise<Object> {
        const clone = Object.assign({}, transaction);
        clone.place = clone.place || new Place();
        clone.date = clone.date || new Date();
        clone.account = clone.account || new Acc();

        return this.db.execWithParams(
            "INSERT into transactions (id_place, value, date, id_account, id_category) VALUES (?, ?, ?, ?, ?)", 
            [clone.place.id, clone.value, clone.date.toString(), clone.account.id]
        ).then
        (
            id => 
            {
                return Promise.resolve(id);
            }, 
            error => 
            {
                return Promise.reject(error);
            }
        ).catch(e => {
            return Promise.reject(e);
        });
    }

    delete(id: number): Promise<any> {
        return null;
    }

    confirm(id: number): Promise<any> {
        return null;
    }

}