import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Patient, PatientListParams, PatientStats } from "../models";
import { PagedResult } from "../../../core/api/paged-result";
import { ApiResponse } from "../../../core/api/api-response";
import { toHttpParams } from "../../../core/api/to-http-params";
import { finalize, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PatientService {
    private readonly http = inject(HttpClient);
    private readonly api = `${environment.apiUrl}/Patient`

    readonly stats = signal<PatientStats | null>(null);
    readonly isStatsLoading = signal(false);
    readonly patients = signal<PagedResult<Patient> | null>(null);
    readonly isLoading = signal(false);

    loadList(params: PatientListParams = {}) {
        this.isLoading.set(true);
        return this.http.get<ApiResponse<PagedResult<Patient>>>(`${this.api}/list`, {
            params: toHttpParams(params),
        })
            .pipe(
                tap(res => {
                    if (res.isSuccess && res.data) this.patients.set(res.data)
                }),
                finalize(() => this.isLoading.set(false))
            );
    }

    loadStats() {
        this.isStatsLoading.set(true);
        return this.http.get<ApiResponse<PatientStats>>(`${this.api}/stats`).pipe(
            tap(res => {
                if (res.isSuccess && res.data) this.stats.set(res.data)
            }),
            finalize(() => this.isStatsLoading.set(false))
        );
    }

    updateStatus(id: string, status: 'Active' | 'Deactivated') {
        return this.http.patch<ApiResponse<string>>(`${this.api}/status/${id}`, { status });
    }

}
