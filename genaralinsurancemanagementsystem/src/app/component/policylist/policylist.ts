import { Component, OnInit } from '@angular/core';
import { Policy } from '../../model/policy.model';
import { PolicyService } from '../../service/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policylist',
  standalone: false,
  templateUrl: './policylist.html',
  styleUrl: './policylist.css'
})
export class Policylist implements OnInit{

  policies: Policy[] = [];

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data;
    });
  }

  deletePolicy(id: string): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(id).subscribe(() => {
        this.loadPolicies();
      });
    }
  }
}
