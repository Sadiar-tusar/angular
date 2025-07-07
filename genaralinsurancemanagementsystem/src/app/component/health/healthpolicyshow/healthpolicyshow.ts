import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HealthService } from '../../../service/health.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthpolicyshow',
  standalone: false,
  templateUrl: './healthpolicyshow.html',
  styleUrl: './healthpolicyshow.css'
})
export class Healthpolicyshow implements OnInit{

  policies: any;

   constructor(
    private healthService: HealthService,
     private router: Router,
     private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData():void {
 this.policies= this.healthService.getAllPolicy();
  }

   
    

  

  deletePolicy(policyId: string): void {
    this.healthService.deletePolicy(policyId).subscribe({

      next: () => {
        this.loadAllData();
        this.cdr.reattach();
      },
      error: (error) => {

      }
    })

  }

  getPolicyById(policyId: string): void{
this.healthService.getPolicyById(policyId).subscribe({

  next: () => {
        this.loadAllData();
        this.router.navigate(['/showhealthpolicy',policyId])
      },
      error: (error) => {

      }
})
  }
}
