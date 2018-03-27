import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IncidentIncident } from './incident-incident.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IncidentIncident>;

@Injectable()
export class IncidentIncidentService {

    private resourceUrl =  SERVER_API_URL + 'incidentmodule/api/v1/incidents';
    private resourceSearchUrl = SERVER_API_URL + 'incidentmodule/api/v1/_search/incidents';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(incident: IncidentIncident): Observable<EntityResponseType> {
        const copy = this.convert(incident);
        return this.http.post<IncidentIncident>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(incident: IncidentIncident): Observable<EntityResponseType> {
        const copy = this.convert(incident);
        return this.http.put<IncidentIncident>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IncidentIncident>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IncidentIncident[]>> {
        const options = createRequestOption(req);
        return this.http.get<IncidentIncident[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IncidentIncident[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<IncidentIncident[]>> {
        const options = createRequestOption(req);
        return this.http.get<IncidentIncident[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IncidentIncident[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IncidentIncident = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IncidentIncident[]>): HttpResponse<IncidentIncident[]> {
        const jsonResponse: IncidentIncident[] = res.body;
        const body: IncidentIncident[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IncidentIncident.
     */
    private convertItemFromServer(incident: IncidentIncident): IncidentIncident {
        const copy: IncidentIncident = Object.assign({}, incident);
        return copy;
    }

    /**
     * Convert a IncidentIncident to a JSON which can be sent to the server.
     */
    private convert(incident: IncidentIncident): IncidentIncident {
        const copy: IncidentIncident = Object.assign({}, incident);
        return copy;
    }
}
