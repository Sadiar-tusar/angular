import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceiptModel } from '../../model/receipt.model';
import { ReceiptService } from '../../service/receipt.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var html2pdf: any;

@Component({
  selector: 'app-print-fire-cover-note',
  standalone: false,
  templateUrl: './print-fire-cover-note.html',
  styleUrl: './print-fire-cover-note.css'
})
export class PrintFireCoverNote implements OnInit {

 moneyreceipt!: ReceiptModel;

 constructor(
   private moneyreceiptService: ReceiptService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
 ){}

  ngOnInit(): void {
     const id = this.route.snapshot.params['id'];
    this.moneyreceiptService.getReciptById(id).subscribe({
      next: (response) => {
        this.moneyreceipt = response;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log(error);
      }
    });
    // this.isDataLoaded();
  }

   getSumInsured(): number {
    return this.moneyreceipt?.bill?.policies?.sumInsured ?? 0;
  }

  getFireRate(): number {
    return (this.moneyreceipt?.bill?.fire ?? 0) / 100;
  }

  getTotalFire(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    return Math.round(sumInsured * fireRate);
  }

  getRsdRate(): number {
    return (this.moneyreceipt?.bill?.rsd ?? 0) / 100;
  }

  getTotalRsd(): number {
    const sumInsured = this.getSumInsured();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * rsdRate);
  }

  getTaxRate(): number {
    return (this.moneyreceipt?.bill?.tax ?? 0) / 100;
  }

  getTotalPremium(): number {
    const sumInsured = this.getSumInsured();
    const fireRate = this.getFireRate();
    const rsdRate = this.getRsdRate();
    return Math.round(sumInsured * (fireRate + rsdRate));
  }

  getTotalTax(): number {
    const totalPremium = this.getTotalPremium();
    const taxRate = this.getTaxRate();
    return Math.round(totalPremium * taxRate);
  }

  getTotalPremiumWithTax(): number {
    const totalPremium = this.getTotalPremium();
    const totalTax = this.getTotalTax();
    return Math.round(totalPremium + totalTax);
  }

  convertToWords(num: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const numToWords = (n: number): string => {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
      if (n < 100000) return numToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
      return "";
    };

    return numToWords(num);
  }

  convertAmountToWords(amount: number): string {
    const words = this.convertToWords(amount);
    return `${words} Taka`;
  }

  getTotalAmountInWords(): string {
    const totalAmount = this.getTotalPremiumWithTax();
    return this.convertAmountToWords(totalAmount);
  }

    // New Method to Get Sum Insured in Words
    getSumInsuredInWords(): string {
      const sumInsuredAmount = this.getSumInsured();
      return this.convertAmountToWords(sumInsuredAmount);
    }

     isDataLoaded(): boolean {
    return !!this.moneyreceipt;
  }

  printStatement(): void {
    const element = document.getElementById('statementTable');
    const opt = {
      margin: 0.5,
      filename: `fire-statement-${this.moneyreceipt.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (element) {
      html2pdf().set(opt).from(element).save();
    } else {
      alert('Nothing to print!');
    }
  }

}
