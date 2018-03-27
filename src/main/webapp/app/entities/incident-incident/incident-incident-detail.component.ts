import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentIncident } from './incident-incident.model';
import { IncidentIncidentService } from './incident-incident.service';

@Component({
    selector: 'jhi-incident-incident-detail',
    templateUrl: './incident-incident-detail.component.html'
})
export class IncidentIncidentDetailComponent implements OnInit, OnDestroy {

    incident: IncidentIncident;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private incidentService: IncidentIncidentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIncidents();
    }

    load(id) {
        this.incidentService.find(id)
            .subscribe((incidentResponse: HttpResponse<IncidentIncident>) => {
                this.incident = incidentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIncidents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'incidentListModification',
            (response) => this.load(this.incident.id)
        );
    }
}
