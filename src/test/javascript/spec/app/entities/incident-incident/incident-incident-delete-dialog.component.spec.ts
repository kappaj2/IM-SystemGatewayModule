/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { IncidentIncidentDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident-delete-dialog.component';
import { IncidentIncidentService } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.service';

describe('Component Tests', () => {

    describe('IncidentIncident Management Delete Component', () => {
        let comp: IncidentIncidentDeleteDialogComponent;
        let fixture: ComponentFixture<IncidentIncidentDeleteDialogComponent>;
        let service: IncidentIncidentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [IncidentIncidentDeleteDialogComponent],
                providers: [
                    IncidentIncidentService
                ]
            })
            .overrideTemplate(IncidentIncidentDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentIncidentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentIncidentService);
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
