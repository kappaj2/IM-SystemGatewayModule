import { BaseEntity } from './../../shared';

export class CountryInventory implements BaseEntity {
    constructor(
        public id?: number,
        public countryCode?: string,
        public countryName?: string,
        public regions?: BaseEntity[],
    ) {
    }
}
