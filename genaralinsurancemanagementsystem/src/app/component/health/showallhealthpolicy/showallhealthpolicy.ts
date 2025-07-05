import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HealthInsurancePolicy } from '../../../model/health.model';
import { HealthService } from '../../../service/health.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showallhealthpolicy',
  standalone: false,
  templateUrl: './showallhealthpolicy.html',
  styleUrl: './showallhealthpolicy.css'
})
export class Showallhealthpolicy implements OnInit {

  policies: HealthInsurancePolicy[] = [];

  constructor(
    private healthService: HealthService,
     private router: Router,
     private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies() {
   this.healthService.getAllPolicies().subscribe(data => this.policies = data);
  }

  getPolicyById(id: string): void {
    this.healthService.getPolicyById(id).subscribe({

      next: () => {
        this.loadPolicies();
        this.router.navigate(['/updatepolicy', id])
      },
      error: (error) => {

      }
    })
  }

   deletePolicy(id: string): void {
    this.healthService.deletePolicy(id).subscribe({

      next: () => {
        this.loadPolicies();
        this.cdr.reattach();
      },
      error: (error) => {

      }
    })

  }



}
