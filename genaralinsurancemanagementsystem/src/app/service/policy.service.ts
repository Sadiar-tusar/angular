import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Policy } from '../model/policy.model';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl: string="http://localhost:3000/policies";

  constructor(
    private http: HttpClient
  ) { }

   // View all policies
  viewAllPolicy(): Observable<any> {
    return this.http.get(this.baseUrl);

  }

// save policy
  savePolicy(policy: Policy): Observable<any> {
    return this.http.post(this.baseUrl, policy);
  }

  // Delete a policy by ID
  deletePolicy(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);
  }

  getPolicyById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + "/" + id);
  }

  // update policy by id
  updatePloicy(id:string, policy:Policy): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, policy);
  }

  // Create a new policy
    createPolicy(policy: Policy): Observable<any> {
    return this.http.post(this.baseUrl, policy)
     
  }
}
