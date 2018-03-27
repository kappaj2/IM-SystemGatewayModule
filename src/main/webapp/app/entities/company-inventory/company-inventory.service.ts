import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CompanyInventory } from './company-inventory.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CompanyInventory>;

@Injectable()
export class CompanyInventoryService {

    private resourceUrl =  SERVER_API_URL + 'inventorymodule/api/v1/companies';
    private resourceSearchUrl = SERVER_API_URL + 'inventorymodule/api/v1/_search/companies';

    constructor(private http: HttpClient) { }

    create(company: CompanyInventory): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.post<CompanyInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(company: CompanyInventory): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.put<CompanyInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CompanyInventory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CompanyInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<CompanyInventory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CompanyInventory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CompanyInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<CompanyInventory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CompanyInventory[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CompanyInventory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CompanyInventory[]>): HttpResponse<CompanyInventory[]> {
        const jsonResponse: CompanyInventory[] = res.body;
        const body: CompanyInventory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CompanyInventory.
     */
    private convertItemFromServer(company: CompanyInventory): CompanyInventory {
        const copy: CompanyInventory = Object.assign({}, company);
        return copy;
    }

    /**
     * Convert a CompanyInventory to a JSON which can be sent to the server.
     */
    private convert(company: CompanyInventory): CompanyInventory {
        const copy: CompanyInventory = Object.assign({}, company);
        return copy;
    }
}
