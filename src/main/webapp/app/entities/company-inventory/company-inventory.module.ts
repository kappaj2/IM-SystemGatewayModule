import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewayModuleSharedModule } from '../../shared';
import {
    CompanyInventoryService,
    CompanyInventoryPopupService,
    CompanyInventoryComponent,
    CompanyInventoryDetailComponent,
    CompanyInventoryDialogComponent,
    CompanyInventoryPopupComponent,
    CompanyInventoryDeletePopupComponent,
    CompanyInventoryDeleteDialogComponent,
    companyRoute,
    companyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...companyRoute,
    ...companyPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewayModuleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CompanyInventoryComponent,
        CompanyInventoryDetailComponent,
        CompanyInventoryDialogComponent,
        CompanyInventoryDeleteDialogComponent,
        CompanyInventoryPopupComponent,
        CompanyInventoryDeletePopupComponent,
    ],
    entryComponents: [
        CompanyInventoryComponent,
        CompanyInventoryDialogComponent,
        CompanyInventoryPopupComponent,
        CompanyInventoryDeleteDialogComponent,
        CompanyInventoryDeletePopupComponent,
    ],
    providers: [
        CompanyInventoryService,
        CompanyInventoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayModuleCompanyInventoryModule {}
