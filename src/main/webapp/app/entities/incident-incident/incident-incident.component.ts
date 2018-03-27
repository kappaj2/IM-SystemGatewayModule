import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IncidentIncident } from './incident-incident.model';
import { IncidentIncidentService } from './incident-incident.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-incident-incident',
    templateUrl: './incident-incident.component.html'
})
export class IncidentIncidentComponent implements OnInit, OnDestroy {
incidents: IncidentIncident[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private incidentService: IncidentIncidentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.incidentService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<IncidentIncident[]>) => this.incidents = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.incidentService.query().subscribe(
            (res: HttpResponse<IncidentIncident[]>) => {
                this.incidents = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIncidents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IncidentIncident) {
        return item.id;
    }
    registerChangeInIncidents() {
        this.eventSubscriber = this.eventManager.subscribe('incidentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
