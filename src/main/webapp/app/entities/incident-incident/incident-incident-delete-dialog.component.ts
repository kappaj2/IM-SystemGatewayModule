import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IncidentIncident } from './incident-incident.model';
import { IncidentIncidentPopupService } from './incident-incident-popup.service';
import { IncidentIncidentService } from './incident-incident.service';

@Component({
    selector: 'jhi-incident-incident-delete-dialog',
    templateUrl: './incident-incident-delete-dialog.component.html'
})
export class IncidentIncidentDeleteDialogComponent {

    incident: IncidentIncident;

    constructor(
        private incidentService: IncidentIncidentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incidentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'incidentListModification',
                content: 'Deleted an incident'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-incident-incident-delete-popup',
    template: ''
})
export class IncidentIncidentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incidentPopupService: IncidentIncidentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.incidentPopupService
                .open(IncidentIncidentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
