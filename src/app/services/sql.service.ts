import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SqlService {

    constructor(private http: HttpClient) { }

    /**
     *
     * @param queryType Type of Query to Be Executed
     * @param theTable Name of Table on which Query Needs to Be Executed
     * @param request Additional Parameters for Query Generation
     */
    private createRequest(
        typeOfQuery: string,
        theTable: string,
        theRequest?: SqlRequest,
        verbose?: boolean) {

        const request = {
            queryType: typeOfQuery,
            tableName: theTable,
            params: theRequest,
        };

        if (verbose) {
            return this.http.post(environment.serverUrl, request);
        } else {
            return this.http.post(environment.serverUrl, request).pipe(map((response: SqlResponse) => {
                console.log(response);
                return response.rows;
            }));
        }
    }

    select = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
        return this.createRequest('select', theTable, request, verbose);
    }
    insert = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
        return this.createRequest('insert', theTable, request, verbose);
    }
    update = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
        return this.createRequest('update', theTable, request, verbose);
    }
    delete = (theTable: string, request?: SqlRequest, verbose?: boolean) => {
        return this.createRequest('delete', theTable, request, verbose);
    }
}

export interface SqlRequest {
    columns?: Array<string>;
    andWhere?: any;
    orWhere?: any;
    orderBy?: string;
    limit?: string;
    join?: string;
    leftJoin?: string;
    rightJoin?: string;
    userData?: any;
}

export interface SqlResponse {
    rows: Array<any>;
    query: string;
    rowCount: number;
    lastInsertId: number;
    error?: string;
}


