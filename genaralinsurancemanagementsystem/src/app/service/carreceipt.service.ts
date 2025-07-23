import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarreceiptService {

  baseUrl: string="http://localhost:3000/carreceipt"

  constructor() { }
}
