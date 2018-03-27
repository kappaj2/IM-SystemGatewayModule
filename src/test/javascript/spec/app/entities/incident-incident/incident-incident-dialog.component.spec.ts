/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { IncidentIncidentDialogComponent } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident-dialog.component';
import { IncidentIncidentService } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.service';
import { IncidentIncident } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.model';
import { CompanyInventoryService } from '../../../../../../main/webapp/app/entities/company-inventory';

describe('Component Tests', () => {

    describe('IncidentIncident Management Dialog Component', () => {
        let comp: IncidentIncidentDialogComponent;
        let fixture: ComponentFixture<IncidentIncidentDialogComponent>;
        let service: IncidentIncidentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [IncidentIncidentDialogComponent],
                providers: [
                    CompanyInventoryService,
                    IncidentIncidentService
                ]
            })
            .overrideTemplate(IncidentIncidentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentIncidentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentIncidentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IncidentIncident(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.incident = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'incidentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IncidentIncident();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.incident = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'incidentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
