import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PolicyModel } from '../../model/policy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillModel } from '../../model/bill.model';
import { ReceiptModel } from '../../model/receipt.model';
import { ReceiptService } from '../../service/receipt.service';
import { BilmodelService } from '../../service/bilmodel.service';
import { PolicymodelService } from '../../service/policymodel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creatreciept',
  standalone: false,
  templateUrl: './creatreciept.html',
  styleUrl: './creatreciept.css'
})
export class Creatreciept implements OnInit {

  policies: PolicyModel[] = [];
  bill: BillModel[] = [];
  receipt: ReceiptModel = new ReceiptModel();
  selectedBill?: BillModel;
  receiptForm!: FormGroup;

  constructor(
    private receiptService: ReceiptService,
    private billService: BilmodelService,
    private policyService: PolicymodelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBill();
    this.loadPolicies();

    this.receiptForm = this.formBuilder.group({
      issuingOffice: [''],
      classOfInsurance: [''],
      date: [''],
      modeOfPayment: [''],
      issuedAgainst: [''],
      bill: this.formBuilder.group({
        id: [''],
        fire: [''],
        rsd: [''],
        netPremium: [''],
        tax: [''],
        grossPremium: [''],
        policies: this.formBuilder.group({
          id: [''],
          billNo: [''],
          date: [''],
          bankName: [''],
          policyholder: [''],
          address: [''],
          sumInsured: [''],
          stockInsured: [''],
          interestInsured: [''],
          location: [''],
          construction: [''],
          owner: [''],
          usedAs: [''],
          periodFrom: [''],
          periodTo: ['']
        })
      })
    });

    // Auto-fill selected bill on policyholder change
    this.receiptForm.get('bill.policies.policyholder')?.valueChanges.subscribe(policyholder => {
      this.selectedBill = this.bill.find(b => b.policies.policyholder === policyholder);
      if (this.selectedBill) {
        this.receiptForm.patchValue({
          bill: {
            id: this.selectedBill.id,
            fire: this.selectedBill.fire,
            rsd: this.selectedBill.rsd,
            netPremium: this.selectedBill.netPremium,
            tax: this.selectedBill.tax,
            grossPremium: this.selectedBill.grossPremium,
            policies: this.selectedBill.policies
          }
        });
      }
    });
  }

  loadPolicies(): void {
    this.policyService.viewAllPolicyForBill().subscribe({
      next: (res) => {
        this.policies = res;
        this.cdr.markForCheck();
        console.log('Policies:', res);
      },
      error: (err) => {
        console.error('Error loading policies:', err);
      }
    });
  }

  loadBill(): void {
    this.billService.getAllBillForReciept().subscribe({
      next: (res) => {
        this.bill = res;
        this.cdr.markForCheck();
        console.log('Bills:', res);
      },
      error: (err) => {
        console.error('Error loading bills:', err);
      }
    });
  }

  createReceipt(): void {
  if (this.receiptForm.valid) {
    const formValues = this.receiptForm.value;

    // Assign all fields explicitly
    this.receipt = {
      id: formValues.id,
      issuingOffice: formValues.issuingOffice,
      classOfInsurance: formValues.classOfInsurance,
      date: formValues.date,
      modeOfPayment: formValues.modeOfPayment,
      issuedAgainst: formValues.issuedAgainst,
      bill: formValues.bill
    };

    this.receiptService.creatRecipt(this.receipt).subscribe({
      next: (res) => {
        this.loadBill();
        this.loadPolicies();
        this.receiptForm.reset();
        this.cdr.reattach();
        this.router.navigate(['/viewreciept']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {
    console.warn('Form is Invalid');
  }
}


}
