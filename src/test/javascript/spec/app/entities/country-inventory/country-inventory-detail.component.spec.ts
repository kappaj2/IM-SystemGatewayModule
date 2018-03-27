/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { CountryInventoryDetailComponent } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory-detail.component';
import { CountryInventoryService } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory.service';
import { CountryInventory } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory.model';

describe('Component Tests', () => {

    describe('CountryInventory Management Detail Component', () => {
        let comp: CountryInventoryDetailComponent;
        let fixture: ComponentFixture<CountryInventoryDetailComponent>;
        let service: CountryInventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [CountryInventoryDetailComponent],
                providers: [
                    CountryInventoryService
                ]
            })
            .overrideTemplate(CountryInventoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryInventoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryInventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CountryInventory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
