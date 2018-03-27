/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { IncidentIncidentComponent } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.component';
import { IncidentIncidentService } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.service';
import { IncidentIncident } from '../../../../../../main/webapp/app/entities/incident-incident/incident-incident.model';

describe('Component Tests', () => {

    describe('IncidentIncident Management Component', () => {
        let comp: IncidentIncidentComponent;
        let fixture: ComponentFixture<IncidentIncidentComponent>;
        let service: IncidentIncidentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [IncidentIncidentComponent],
                providers: [
                    IncidentIncidentService
                ]
            })
            .overrideTemplate(IncidentIncidentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IncidentIncidentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncidentIncidentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IncidentIncident(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.incidents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
