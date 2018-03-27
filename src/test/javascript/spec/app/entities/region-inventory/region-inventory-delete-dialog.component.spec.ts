/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { RegionInventoryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/region-inventory/region-inventory-delete-dialog.component';
import { RegionInventoryService } from '../../../../../../main/webapp/app/entities/region-inventory/region-inventory.service';

describe('Component Tests', () => {

    describe('RegionInventory Management Delete Component', () => {
        let comp: RegionInventoryDeleteDialogComponent;
        let fixture: ComponentFixture<RegionInventoryDeleteDialogComponent>;
        let service: RegionInventoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [RegionInventoryDeleteDialogComponent],
                providers: [
                    RegionInventoryService
                ]
            })
            .overrideTemplate(RegionInventoryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegionInventoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionInventoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
