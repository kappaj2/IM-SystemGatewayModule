import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemGatewayModuleSharedModule } from '../../shared';
import {
    IncidentIncidentService,
    IncidentIncidentPopupService,
    IncidentIncidentComponent,
    IncidentIncidentDetailComponent,
    IncidentIncidentDialogComponent,
    IncidentIncidentPopupComponent,
    IncidentIncidentDeletePopupComponent,
    IncidentIncidentDeleteDialogComponent,
    incidentRoute,
    incidentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...incidentRoute,
    ...incidentPopupRoute,
];

@NgModule({
    imports: [
        SystemGatewayModuleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IncidentIncidentComponent,
        IncidentIncidentDetailComponent,
        IncidentIncidentDialogComponent,
        IncidentIncidentDeleteDialogComponent,
        IncidentIncidentPopupComponent,
        IncidentIncidentDeletePopupComponent,
    ],
    entryComponents: [
        IncidentIncidentComponent,
        IncidentIncidentDialogComponent,
        IncidentIncidentPopupComponent,
        IncidentIncidentDeleteDialogComponent,
        IncidentIncidentDeletePopupComponent,
    ],
    providers: [
        IncidentIncidentService,
        IncidentIncidentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayModuleIncidentIncidentModule {}
