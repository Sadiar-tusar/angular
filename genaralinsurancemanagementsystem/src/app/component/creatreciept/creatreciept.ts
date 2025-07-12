import { Component, OnInit } from '@angular/core';
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
export class Creatreciept implements OnInit{

  policies: PolicyModel[]=[];
  billForm !: FormGroup;
  bill: BillModel[]=[];
  receipt: ReceiptModel=new ReceiptModel();
  selectedBill?:BillModel;
  receiptForm!:FormGroup;

  constructor(
    private receiptService: ReceiptService,
    private billService: BilmodelService,
    private policyService: PolicymodelService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {

    this.loadBill(),
    this.loadPolicies

  this.receiptForm= this.formBuilder.group({
    // id:[''],
    issuingOffice: [''],
      classOfInsurance: [''],
      date: [''],
      modeOfPayment: [''],
      issuedAgainst: [''],
    bill: this.formBuilder.group({
      id:[''],
      fire:[''],
      rsd:[''],
      netPremium:[''],
      tax:[''],
      grossPremium:[''],
      policies:this.formBuilder.group({
        id:[''],
        billNo:[''],
        date:[''],
        bankName:[''],
        policyholder:[''],
        address:[''],
        sumInsured:[''],
        stockInsured:[''],
        interestInsured:[''],
        location:[''],
        construction:[''],
        owner:[''],
        usedAs:[''],
        priodFrom:[''],
        priodTo:['']
      })
    })
  });
  this.receiptForm.get('bill.policies.policyholder')?.valueChanges.subscribe(policyholder=>{
    this.selectedBill=this.bill.find(bill=>bill.policies.policyholder===policyholder);
    console.log(this.selectedBill);
    if(this.selectedBill){
      this.receiptForm.patchValue({
        bill:{
          ...this.receiptForm.get('bill')?.value,
          fire:this.selectedBill.fire,
          rsd:this.selectedBill.rsd,
          netPremium:this.selectedBill.netPremium,
          grossPremium:this.selectedBill.grossPremium,
          policies: this.selectedBill.policies
          
        },

      })
    }
  });
  }

  loadPolicies(): void{
   this.policyService.viewAllPolicyForBill().subscribe({
    next:(res)=>{
      this.policies=res;
      console.log(this.policies);
    },
    error:(err)=>{
      console.log(err);
    }
   });
  }

  loadBill():void{
    this.billService.getAllBillForReciept().subscribe({
      next:(res)=>{
        this.bill=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  creatReceipt(): void{
    if(this.receiptForm.valid){
      const formValues = this.receiptForm.value;
      this.receipt.bill = formValues.bill;
      this.receiptService.creatRecipt(this.receipt).subscribe({
        next:(res)=>{
          this.loadBill();
          this.loadPolicies();
          this.receiptForm.reset();
          this.router.navigate(['viewreciept']);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else{
      console.warn('Form is Invalid');
    }
  }

}
