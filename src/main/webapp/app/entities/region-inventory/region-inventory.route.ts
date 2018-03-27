import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RegionInventoryComponent } from './region-inventory.component';
import { RegionInventoryDetailComponent } from './region-inventory-detail.component';
import { RegionInventoryPopupComponent } from './region-inventory-dialog.component';
import { RegionInventoryDeletePopupComponent } from './region-inventory-delete-dialog.component';

export const regionRoute: Routes = [
    {
        path: 'region-inventory',
        component: RegionInventoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'region-inventory/:id',
        component: RegionInventoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-inventory-new',
        component: RegionInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-inventory/:id/edit',
        component: RegionInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'region-inventory/:id/delete',
        component: RegionInventoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
