import { Component, OnInit } from '@angular/core';
import { ReceiptModel } from '../../model/receipt.model';

import { ReceiptService } from '../../service/receipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reciept',
  standalone: false,
  templateUrl: './reciept.html',
  styleUrl: './reciept.css'
})
export class Reciept implements OnInit{
 moneyreceipts: ReceiptModel[] = [];
  filteredMoneyReceipts: ReceiptModel[] = []; 
  searchTerm: string = '';            
  sortBy: 'issuingOffice' | 'policyholder' | 'id' | 'bankName' = 'policyholder'; 

receipts: ReceiptModel[]=[];

constructor(
  
  private receiptService: ReceiptService,
  private router: Router,
 
){}

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void{
    this.receiptService.getAllReciept().subscribe({
      next:(res)=>{
        this.moneyreceipts=res;
        this.filteredMoneyReceipts=[...this.moneyreceipts];
      },
      error:(err)=>{
        console.log(err);
        alert('Faild to feth receips.Please Try again');
      }
    });
  }

  viewReceipt(id: string):void{
    this.router.navigate(['/printreciept', id]);
  }

  deleteReceipt(id:string): void{
    this.receiptService.deleteRecipt(id).subscribe({
      next:()=>{
        this.moneyreceipts=this.moneyreceipts.filter(receipt => receipt.id !==id);
        this.filteredMoneyReceipts= this.filteredMoneyReceipts.filter(receipt =>receipt.id !==id);
        this.router.navigate(['/viewReceipt']);
      }
    });
  }

  viewMoneyReceipt(id: string) {
    this.router.navigate(['/printmoneyreciept', id]);
  }

  printFireCoverNote(id: string) {
    this.router.navigate(['/print-fire-cover-note', id]);
  }

  navigateToAddReciept(){
    this.router.navigate(['createreceipt']);
  }

  searchMoneyReceipt(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    this.filteredMoneyReceipts = this.moneyreceipts.filter(item =>
      item.issuingOffice?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policies.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policies.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bill?.policies.id?.toString().includes(lowerCaseSearchTerm)
    );
  }

}
