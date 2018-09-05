import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataBase } from '../../sqlite/db';
import { TransactionDao } from '../dao/transaction.dao';
import { Transaction } from '../model/transaction';

@Injectable()
export class TransactionService {

    constructor(public transactionDao: TransactionDao) {
        this.transactionDao = transactionDao;
    }

    getById(id: number): Observable<any> {
        return null
    }

    list(filters: any): Promise<Object> {        
        return this.transactionDao.list({});
    }

    add(transaction: Transaction): Promise<Object> {
        return this.transactionDao.add(transaction);
    }

    delete(id: number): Promise<any> {
        return null;
    }

    confirm(id: number): Promise<any> {
        return null;
    }

}