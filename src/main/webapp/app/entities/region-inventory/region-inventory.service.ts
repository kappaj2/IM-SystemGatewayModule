import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RegionInventory } from './region-inventory.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RegionInventory>;

@Injectable()
export class RegionInventoryService {

    private resourceUrl =  SERVER_API_URL + 'inventorymodule/api/v1/regions';
    private resourceSearchUrl = SERVER_API_URL + 'inventorymodule/api/v1/_search/regions';

    constructor(private http: HttpClient) { }

    create(region: RegionInventory): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.post<RegionInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(region: RegionInventory): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.put<RegionInventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RegionInventory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RegionInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegionInventory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegionInventory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<RegionInventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegionInventory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegionInventory[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegionInventory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RegionInventory[]>): HttpResponse<RegionInventory[]> {
        const jsonResponse: RegionInventory[] = res.body;
        const body: RegionInventory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RegionInventory.
     */
    private convertItemFromServer(region: RegionInventory): RegionInventory {
        const copy: RegionInventory = Object.assign({}, region);
        return copy;
    }

    /**
     * Convert a RegionInventory to a JSON which can be sent to the server.
     */
    private convert(region: RegionInventory): RegionInventory {
        const copy: RegionInventory = Object.assign({}, region);
        return copy;
    }
}
