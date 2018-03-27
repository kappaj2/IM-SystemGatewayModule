/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SystemGatewayModuleTestModule } from '../../../test.module';
import { RegionInventoryComponent } from '../../../../../../main/webapp/app/entities/region-inventory/region-inventory.component';
import { RegionInventoryService } from '../../../../../../main/webapp/app/entities/region-inventory/region-inventory.service';
import { RegionInventory } from '../../../../../../main/webapp/app/entities/region-inventory/region-inventory.model';

describe('Component Tests', () => {

    describe('RegionInventory Management Component', () => {
        let comp: RegionInventoryComponent;
        let fixture: ComponentFixture<RegionInventoryComponent>;
        let service: RegionInventoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemGatewayModuleTestModule],
                declarations: [RegionInventoryComponent],
                providers: [
                    RegionInventoryService
                ]
            })
            .overrideTemplate(RegionInventoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegionInventoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionInventoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RegionInventory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.regions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
