import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../service/policy.service';
import { Policy } from '../../model/policy.model';

@Component({
  selector: 'app-policyform',
  standalone: false,
  templateUrl: './policyform.html',
  styleUrl: './policyform.css'
})
export class Policyform implements OnInit{

  policies:any;
   policyForm!: FormGroup;
  isEditMode = false;
  policyId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      id: ['', Validators.required],
      policyholderName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      policyStartDate: ['', Validators.required],
      policyEndDate: ['', Validators.required],
      sumInsured: [null, Validators.required],
      premiumAmount: [null, Validators.required],
      coverageLimit: [null, Validators.required],
      nomineeName: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadPolicy();

    this.policyId = this.route.snapshot.params['id'];
    if (this.policyId) {
      this.isEditMode = true;
      this.policyService.getPolicyById(this.policyId).subscribe(data => {
        this.policyForm.patchValue(data);
      });
    }
  }

  loadPolicy(): void{
    this.policies = this.policyService.getPolicies();
  }

  onSubmit(): void {
    if (this.policyForm.invalid) return;

    const formData = this.policyForm.value;
    const policy = new Policy();
    Object.assign(policy, formData);

    if (this.isEditMode) {
      this.policyService.updatePolicy(this.policyId, policy).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.policyService.addPolicy(policy).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
