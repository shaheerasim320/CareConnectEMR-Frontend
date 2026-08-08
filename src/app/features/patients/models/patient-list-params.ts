import { PagedQueryParams } from "../../../core/api/paged-query-params";
import { PatientStatus } from "./patient";

export interface PatientListParams extends PagedQueryParams{
    search?: string;
    status?: PatientStatus;
    includeAll?: boolean;
}