import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Policy } from '../model/policy.model';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl: string="http://localhost:3000/policy";

  constructor(
    private http: HttpClient
  ) { }

  // GET all policies
  getPolicies(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // GET single policy by ID
  getPolicyById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST: Add new policy
  addPolicy(policy: Policy): Observable<any> {
    return this.http.post(this.baseUrl, policy);
  }

  // PUT: Update policy
  updatePolicy(id: string, policy: Policy): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, policy);
  }

  // DELETE: Delete policy
  deletePolicy(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
