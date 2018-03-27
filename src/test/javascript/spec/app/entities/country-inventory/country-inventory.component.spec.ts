/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { CountryInventoryComponent } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory.component';
import { CountryInventoryService } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory.service';
import { CountryInventory } from '../../../../../../main/webapp/app/entities/country-inventory/country-inventory.model';

describe('Component Tests', () => {

    describe('CountryInventory Management Component', () => {
        let comp: CountryInventoryComponent;
        let fixture: ComponentFixture<CountryInventoryComponent>;
        let service: CountryInventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [CountryInventoryComponent],
                providers: [
                    CountryInventoryService
                ]
            })
            .overrideTemplate(CountryInventoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryInventoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryInventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CountryInventory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
