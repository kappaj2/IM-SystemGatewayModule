/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { CompanyInventoryComponent } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.component';
import { CompanyInventoryService } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.service';
import { CompanyInventory } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.model';

describe('Component Tests', () => {

    describe('CompanyInventory Management Component', () => {
        let comp: CompanyInventoryComponent;
        let fixture: ComponentFixture<CompanyInventoryComponent>;
        let service: CompanyInventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [CompanyInventoryComponent],
                providers: [
                    CompanyInventoryService
                ]
            })
            .overrideTemplate(CompanyInventoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyInventoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyInventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CompanyInventory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.companies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
