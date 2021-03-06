import { BaseEntity } from './../../shared';

export class InventoryUsed implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public quantity?: number,
        public note?: string,
        public inventoryItem?: BaseEntity,
    ) {
    }
}
