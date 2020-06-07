import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SqlService {

    constructor(private http: HttpClient) { }

    /**
     *
     * @param queryType Type of Query to Be Executed
     * @param theTable Name of Table on which Query Needs to Be Executed
     * @param request Additional Parameters for Query Generation
     */
    private createRequest(typeOfQuery: string, theTable: string, theRequest?: SqlRequestParams) {
        const request = {
            queryType: typeOfQuery,
            tableName: theTable,
            params: theRequest
        };
        return this.http.post(environment.serverUrl, request);

    }

    select = (theTable: string, request?: SqlRequestParams) => {
        return this.createRequest('select', theTable, request);
    }
    insert = (theTable: string, request?: SqlRequestParams) => {
        return this.createRequest('insert', theTable, request);
    }
    update = (theTable: string, request?: SqlRequestParams) => {
        return this.createRequest('update', theTable, request);
    }
    delete = (theTable: string, request?: SqlRequestParams) => {
        return this.createRequest('delete', theTable, request);
    }
}

export interface SqlRequest {
    queryType: string;
    tableName: string;
    params: SqlRequestParams;
}

export interface SqlRequestParams {
    columns?: Array<string>;
    andWhere?: { [key: string]: any };
    orWhere?: { [key: string]: any };
    orderBy?: string;
    limit?: string;
    join?: string;
    leftJoin?: string;
    rightJoin?: string;
    userData?: { [key: string]: string };
}

export interface SqlResponse {
    status: boolean;
    errors: Array<string>;
    data: Array<any>;
    message: Array<string>;
    token: string;
    lastInsertId: number;
}