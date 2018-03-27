import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewayModuleSharedModule } from '../../shared';
import {
    CountryInventoryService,
    CountryInventoryPopupService,
    CountryInventoryComponent,
    CountryInventoryDetailComponent,
    CountryInventoryDialogComponent,
    CountryInventoryPopupComponent,
    CountryInventoryDeletePopupComponent,
    CountryInventoryDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewayModuleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountryInventoryComponent,
        CountryInventoryDetailComponent,
        CountryInventoryDialogComponent,
        CountryInventoryDeleteDialogComponent,
        CountryInventoryPopupComponent,
        CountryInventoryDeletePopupComponent,
    ],
    entryComponents: [
        CountryInventoryComponent,
        CountryInventoryDialogComponent,
        CountryInventoryPopupComponent,
        CountryInventoryDeleteDialogComponent,
        CountryInventoryDeletePopupComponent,
    ],
    providers: [
        CountryInventoryService,
        CountryInventoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayModuleCountryInventoryModule {}
