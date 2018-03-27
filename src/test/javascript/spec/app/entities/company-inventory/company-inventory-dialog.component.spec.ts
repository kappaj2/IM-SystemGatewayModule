/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { CompanyInventoryDialogComponent } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory-dialog.component';
import { CompanyInventoryService } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.service';
import { CompanyInventory } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.model';
import { RegionInventoryService } from '../../../../../../main/webapp/app/entities/region-inventory';

describe('Component Tests', () => {

    describe('CompanyInventory Management Dialog Component', () => {
        let comp: CompanyInventoryDialogComponent;
        let fixture: ComponentFixture<CompanyInventoryDialogComponent>;
        let service: CompanyInventoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [CompanyInventoryDialogComponent],
                providers: [
                    RegionInventoryService,
                    CompanyInventoryService
                ]
            })
            .overrideTemplate(CompanyInventoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyInventoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyInventoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyInventory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.company = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyInventory();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.company = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
