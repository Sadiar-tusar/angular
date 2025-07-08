import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PolicymodelService } from '../../service/policymodel.service';

@Component({
  selector: 'app-policy',
  standalone: false,
  templateUrl: './policy.html',
  styleUrl: './policy.css'
})
export class Policy implements OnInit{

  policies: any;

constructor(
   private policyService: PolicymodelService,
    private http: HttpClient,
    private router: Router
){}
  ngOnInit(): void {
    this.policies = this.policyService.viewAllPolicy();
  }

   deletePolicy(id: string) {
    this.policyService.deletePolicy(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.policies = this.policyService.viewAllPolicy();
          this.router.navigate(['viewpolicy'])
        },
        error: error => {
          console.log(error);

        }

      });
  }

  editPolicy(id: string) {
    this.router.navigate(['updatepolicy', id]);
  }

  navigateToAddPolicy() {
    this.router.navigateByUrl('/createpolicy');
  }

}
