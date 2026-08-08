import { HttpParams } from "@angular/common/http";

export function toHttpParams(params: Record<string, any>): HttpParams {
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    const apiKey = key.charAt(0).toUpperCase() + key.slice(1);
    httpParams = httpParams.set(apiKey, String(value));
  });

  return httpParams;
}