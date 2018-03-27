import { BaseEntity } from './../../shared';

export class IncidentIncident implements BaseEntity {
    constructor(
        public id?: number,
        public incidentPriorityCode?: string,
        public incidentTypeCode?: string,
        public incidentHeader?: string,
        public incidentDescription?: string,
        public incidentStatusCode?: string,
        public companyId?: number,
        public operator?: number,
    ) {
    }
}
