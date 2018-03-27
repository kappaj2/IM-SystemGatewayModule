import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CountryInventoryComponent } from './country-inventory.component';
import { CountryInventoryDetailComponent } from './country-inventory-detail.component';
import { CountryInventoryPopupComponent } from './country-inventory-dialog.component';
import { CountryInventoryDeletePopupComponent } from './country-inventory-delete-dialog.component';

export const countryRoute: Routes = [
    {
        path: 'country-inventory',
        component: CountryInventoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'country-inventory/:id',
        component: CountryInventoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-inventory-new',
        component: CountryInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-inventory/:id/edit',
        component: CountryInventoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-inventory/:id/delete',
        component: CountryInventoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'systemGatewayModuleApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
