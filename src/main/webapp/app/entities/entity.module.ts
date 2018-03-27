import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SystemGatewayModuleIncidentIncidentModule } from './incident-incident/incident-incident.module';
import { SystemGatewayModuleCompanyInventoryModule } from './company-inventory/company-inventory.module';
import { SystemGatewayModuleRegionInventoryModule } from './region-inventory/region-inventory.module';
import { SystemGatewayModuleCountryInventoryModule } from './country-inventory/country-inventory.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SystemGatewayModuleIncidentIncidentModule,
        SystemGatewayModuleCompanyInventoryModule,
        SystemGatewayModuleRegionInventoryModule,
        SystemGatewayModuleCountryInventoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemGatewayModuleEntityModule {}
