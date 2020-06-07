
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