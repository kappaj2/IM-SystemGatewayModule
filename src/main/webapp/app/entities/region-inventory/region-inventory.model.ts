import { BaseEntity } from './../../shared';

export class RegionInventory implements BaseEntity {
    constructor(
        public id?: number,
        public regionCode?: string,
        public regionName?: string,
        public incidents?: BaseEntity[],
        public countryId?: number,
    ) {
    }
}
