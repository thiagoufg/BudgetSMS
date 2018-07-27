import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {

    constructor() {};

    getById(id: number): Observable<any> {
        return null
    }

    list(filters: any): Observable<any> {        
        return null;
    }

    add(id: number): Promise<any> {
        return null;
    }

    delete(id: number): Promise<any> {
        return null;
    }

    confirm(id: number): Promise<any> {
        return null;
    }

}