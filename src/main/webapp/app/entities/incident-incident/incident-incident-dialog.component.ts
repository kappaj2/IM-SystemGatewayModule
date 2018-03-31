import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IncidentIncident } from './incident-incident.model';
import { IncidentIncidentPopupService } from './incident-incident-popup.service';
import { IncidentIncidentService } from './incident-incident.service';
import { CompanyInventory, CompanyInventoryService } from '../company-inventory';
import {EnumLookupService} from '../../enumlookups/enum-lookup.service';
import {EnumLookup} from '../../shared/model/enum-lookup';

@Component({
    selector: 'jhi-incident-incident-dialog',
    templateUrl: './incident-incident-dialog.component.html'
})
export class IncidentIncidentDialogComponent implements OnInit {

    incident: IncidentIncident;
    isSaving: boolean;

    companies: CompanyInventory[];
    eventTypeEnum: EnumLookup[];
    incidentPriorityEnum: EnumLookup[];
    incidentStatusTypeEnum: EnumLookup[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private incidentService: IncidentIncidentService,
        private companyService: CompanyInventoryService,
        private enumLookupService: EnumLookupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.companyService.query()
            .subscribe((res: HttpResponse<CompanyInventory[]>) => { this.companies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.enumLookupService.find('EventType')
            .subscribe((res: HttpResponse<EnumLookup[]>) => { this.eventTypeEnum = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.enumLookupService.find('IncidentPriority')
            .subscribe((res: HttpResponse<EnumLookup[]>) => { this.incidentPriorityEnum = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.enumLookupService.find('IncidentStatusType')
            .subscribe((res: HttpResponse<EnumLookup[]>) => { this.incidentStatusTypeEnum = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.incident.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incidentService.update(this.incident));
        } else {
            this.subscribeToSaveResponse(
                this.incidentService.create(this.incident));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IncidentIncident>>) {
        result.subscribe((res: HttpResponse<IncidentIncident>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IncidentIncident) {
        this.eventManager.broadcast({ name: 'incidentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCompanyById(index: number, item: CompanyInventory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-incident-incident-popup',
    template: ''
})
export class IncidentIncidentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentPopupService: IncidentIncidentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incidentPopupService
                    .open(IncidentIncidentDialogComponent as Component, params['id']);
            } else {
                this.incidentPopupService
                    .open(IncidentIncidentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
