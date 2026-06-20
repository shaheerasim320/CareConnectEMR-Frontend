import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { DoctorDashboardResponse } from "../../models";
import { ApiResponse } from "../../../../core/api/api-response";
import { finalize, tap } from "rxjs";

@Injectable()
export class DoctorDashboardService {
    private readonly api = `${environment.apiUrl}/Dashboard`;
    private readonly http = inject(HttpClient);

    readonly data = signal<DoctorDashboardResponse | null>(null);
    readonly isLoading = signal(false);

    load(){
        this.isLoading.set(true);

        return this.http.get<ApiResponse<DoctorDashboardResponse>>(`${this.api}/summary`).pipe(
            tap(res => {
                if (res.isSuccess && res.data) {
                    this.data.set(res.data);
                }
            }),
            finalize(() => this.isLoading.set(false))
        );
    }
}