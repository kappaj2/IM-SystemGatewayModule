import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryInventory } from './country-inventory.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CountryInventory>;

@Injectable()
export class CountryInventoryService {

    private resourceUrl =  SERVER_API_URL + 'inventorymodule/api/v1/countries';
    private resourceSearchUrl = SERVER_API_URL + 'inventorymodule/api/v1/_search/countries';

    constructor(private http: HttpClient) { }

    create(country: CountryInventory): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.post<CountryInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(country: CountryInventory): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.put<CountryInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CountryInventory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CountryInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountryInventory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountryInventory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CountryInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountryInventory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountryInventory[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CountryInventory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CountryInventory[]>): HttpResponse<CountryInventory[]> {
        const jsonResponse: CountryInventory[] = res.body;
        const body: CountryInventory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CountryInventory.
     */
    private convertItemFromServer(country: CountryInventory): CountryInventory {
        const copy: CountryInventory = Object.assign({}, country);
        return copy;
    }

    /**
     * Convert a CountryInventory to a JSON which can be sent to the server.
     */
    private convert(country: CountryInventory): CountryInventory {
        const copy: CountryInventory = Object.assign({}, country);
        return copy;
    }
}
