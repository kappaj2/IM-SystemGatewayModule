/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { CompanyInventoryDetailComponent } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory-detail.component';
import { CompanyInventoryService } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.service';
import { CompanyInventory } from '../../../../../../main/webapp/app/entities/company-inventory/company-inventory.model';

describe('Component Tests', () => {

    describe('CompanyInventory Management Detail Component', () => {
        let comp: CompanyInventoryDetailComponent;
        let fixture: ComponentFixture<CompanyInventoryDetailComponent>;
        let service: CompanyInventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [CompanyInventoryDetailComponent],
                providers: [
                    CompanyInventoryService
                ]
            })
            .overrideTemplate(CompanyInventoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyInventoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyInventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CompanyInventory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.company).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
