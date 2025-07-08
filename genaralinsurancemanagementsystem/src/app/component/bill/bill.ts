import { Component, OnInit } from '@angular/core';
import { BillModel } from '../../model/bill.model';
import { PolicymodelService } from '../../service/policymodel.service';
import { BilmodelService } from '../../service/bilmodel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  standalone: false,
  templateUrl: './bill.html',
  styleUrl: './bill.css'
})
export class Bill implements OnInit{

  policyes: any;
  bills: BillModel[] = [];

constructor(
    private policiesService: PolicymodelService,
    private billService: BilmodelService,
    private router: Router

  ) { }
  ngOnInit(): void {
     this.policyes = this.policiesService.viewAllPolicyForBill();

    // Subscribe to the observable to fetch bills
    this.billService.viewAllBill().subscribe({
      next: (data: BillModel[]) => {
        this.bills = data;
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      }
    });
  }

   deleteBill(id: string): void {
    this.billService.deleteBill(id)
      .subscribe({
        next: () => {
          this.refreshBills();
          this.router.navigate(['/viewbill']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  private refreshBills(): void {
    this.billService.viewAllBill().subscribe({
      next: (data: BillModel[]) => {
        this.bills = data;
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      }
    });
  }

  editBill(bill: BillModel): void {
    this.router.navigate(['/updatebill', bill.id]);
  }

  navigateToAddBill() {
    this.router.navigateByUrl('/createbill');
  }

  navigateToAddReciept() {
    this.router.navigateByUrl('/createreciept');
  }

  getFireAmount(bill: BillModel): number {
    const sumInsured = bill.policies?.sumInsured || 0;
    const fireRate = bill.fire || 0;
    return sumInsured * fireRate;
  }

  getRsdAmount(bill: BillModel): number {
    const sumInsured = bill.policies?.sumInsured || 0;
    const rsdRate = bill.rsd || 0;
    return sumInsured * rsdRate;
  }

  getNetPremium(bill: BillModel): number {
    const sumInsured = bill.policies.sumInsured || 0;
    const fireRate = bill.fire || 0;
    const rsdRate = bill.rsd || 0;

    return sumInsured * (fireRate + rsdRate);
  }

  getTaxAmount(bill: BillModel): number {
    const netPremium = this.getNetPremium(bill);
    const taxRate = 0.15; // 15% fixed tax rate

    return netPremium * taxRate;
  }

  getGrossPremium(bill: BillModel): number {
    const netPremium = this.getNetPremium(bill);
    const taxAmount = this.getTaxAmount(bill);

    return netPremium + taxAmount;
  }
}
