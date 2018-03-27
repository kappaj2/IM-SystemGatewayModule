import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CompanyInventoryComponent } from './company-inventory.component';
import { CompanyInventoryDetailComponent } from './company-inventory-detail.component';
import { CompanyInventoryPopupComponent } from './company-inventory-dialog.component';
import { CompanyInventoryDeletePopupComponent } from './company-inventory-delete-dialog.component';

export const companyRoute: Routes = [
    {
        path: 'company-inventory',
        component: CompanyInventoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'company-inventory/:id',
        component: CompanyInventoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPopupRoute: Routes = [
    {
        path: 'company-inventory-new',
        component: CompanyInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-inventory/:id/edit',
        component: CompanyInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-inventory/:id/delete',
        component: CompanyInventoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
