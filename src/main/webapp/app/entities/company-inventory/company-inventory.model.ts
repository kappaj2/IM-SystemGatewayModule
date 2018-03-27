import { BaseEntity } from './../../shared';

export class CompanyInventory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public branchCode?: string,
        public incidents?: BaseEntity[],
        public regionId?: number,
    ) {
    }
}
