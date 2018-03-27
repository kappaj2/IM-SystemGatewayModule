import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegionInventory } from './region-inventory.model';
import { RegionInventoryPopupService } from './region-inventory-popup.service';
import { RegionInventoryService } from './region-inventory.service';

@Component({
    selector: 'jhi-region-inventory-delete-dialog',
    templateUrl: './region-inventory-delete-dialog.component.html'
})
export class RegionInventoryDeleteDialogComponent {

    region: RegionInventory;

    constructor(
        private regionService: RegionInventoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regionListModification',
                content: 'Deleted an region'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-region-inventory-delete-popup',
    template: ''
})
export class RegionInventoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionInventoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regionPopupService
                .open(RegionInventoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
