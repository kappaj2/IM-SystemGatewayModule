import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CompanyInventory } from './company-inventory.model';
import { CompanyInventoryPopupService } from './company-inventory-popup.service';
import { CompanyInventoryService } from './company-inventory.service';
import { RegionInventory} from '../region-inventory';
import { RegionInventoryService } from '../region-inventory';

@Component({
    selector: 'jhi-company-inventory-dialog',
    templateUrl: './company-inventory-dialog.component.html'
})
export class CompanyInventoryDialogComponent implements OnInit {

    company: CompanyInventory;
    isSaving: boolean;

    regions: RegionInventory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyInventoryService,
        private regionService: RegionInventoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.regionService.query()
            .subscribe((res: HttpResponse<RegionInventory[]>) => { this.regions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(
                this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CompanyInventory>>) {
        result.subscribe((res: HttpResponse<CompanyInventory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CompanyInventory) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegionById(index: number, item: RegionInventory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-company-inventory-popup',
    template: ''
})
export class CompanyInventoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyPopupService: CompanyInventoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyPopupService
                    .open(CompanyInventoryDialogComponent as Component, params['id']);
            } else {
                this.companyPopupService
                    .open(CompanyInventoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
