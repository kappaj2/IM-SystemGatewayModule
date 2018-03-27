import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewayModuleSharedModule } from '../../shared';
import {
    RegionInventoryService,
    RegionInventoryPopupService,
    RegionInventoryComponent,
    RegionInventoryDetailComponent,
    RegionInventoryDialogComponent,
    RegionInventoryPopupComponent,
    RegionInventoryDeletePopupComponent,
    RegionInventoryDeleteDialogComponent,
    regionRoute,
    regionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewayModuleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegionInventoryComponent,
        RegionInventoryDetailComponent,
        RegionInventoryDialogComponent,
        RegionInventoryDeleteDialogComponent,
        RegionInventoryPopupComponent,
        RegionInventoryDeletePopupComponent,
    ],
    entryComponents: [
        RegionInventoryComponent,
        RegionInventoryDialogComponent,
        RegionInventoryPopupComponent,
        RegionInventoryDeleteDialogComponent,
        RegionInventoryDeletePopupComponent,
    ],
    providers: [
        RegionInventoryService,
        RegionInventoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayModuleRegionInventoryModule {}
