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

    list(name: any): Promise<Object> {        
        return this.db.selectWithParams("SELECT * from place where name like '%' || ? || '%'", [name || ""]).then
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

    add(place: Place): Promise<Object> {
        const clone = Object.assign({}, place);
        clone.name = clone.name || "";
        return this.db.execWithParams(
            "INSERT into place (name) VALUES (?)", 
            [clone.name.toLowerCase()]
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