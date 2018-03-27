/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { IncidentIncidentDetailComponent } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident-detail.component';
import { IncidentIncidentService } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.service';
import { IncidentIncident } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.model';

describe('Component Tests', () => {

    describe('IncidentIncident Management Detail Component', () => {
        let comp: IncidentIncidentDetailComponent;
        let fixture: ComponentFixture<IncidentIncidentDetailComponent>;
        let service: IncidentIncidentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [IncidentIncidentDetailComponent],
                providers: [
                    IncidentIncidentService
                ]
            })
            .overrideTemplate(IncidentIncidentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentIncidentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentIncidentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IncidentIncident(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.incident).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
