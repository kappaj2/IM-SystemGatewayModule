import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IncidentIncidentComponent } from './incident-incident.component';
import { IncidentIncidentDetailComponent } from './incident-incident-detail.component';
import { IncidentIncidentPopupComponent } from './incident-incident-dialog.component';
import { IncidentIncidentDeletePopupComponent } from './incident-incident-delete-dialog.component';

export const incidentRoute: Routes = [
    {
        path: 'incident-incident',
        component: IncidentIncidentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'incident-incident/:id',
        component: IncidentIncidentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentPopupRoute: Routes = [
    {
        path: 'incident-incident-new',
        component: IncidentIncidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-incident/:id/edit',
        component: IncidentIncidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'incident-incident/:id/delete',
        component: IncidentIncidentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
