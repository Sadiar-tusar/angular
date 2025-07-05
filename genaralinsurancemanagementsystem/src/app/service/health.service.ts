import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthInsurancePolicy } from '../model/health.model';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

 private baseUrl:string= "http://localhost:3000/healthinsurancepolicy";

 constructor(private http: HttpClient) {}

  getAllPolicies(): Observable<HealthInsurancePolicy[]> {
    return this.http.get<HealthInsurancePolicy[]>(this.baseUrl);
  }

  getPolicyById(policyId: string): Observable<HealthInsurancePolicy> {
    return this.http.get<HealthInsurancePolicy>(`${this.baseUrl}/${policyId}`);
  }

  createPolicy(policy: HealthInsurancePolicy): Observable<HealthInsurancePolicy> {
    return this.http.post<HealthInsurancePolicy>(this.baseUrl, policy);
  }

  updatePolicy(policyId: string, policy: HealthInsurancePolicy): Observable<HealthInsurancePolicy> {
    return this.http.put<HealthInsurancePolicy>(`${this.baseUrl}/${policyId}`, policy);
  }

  deletePolicy(policyId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${policyId}`);
  }
}
