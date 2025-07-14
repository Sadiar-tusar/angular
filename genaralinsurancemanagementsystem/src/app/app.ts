import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  routingForm!: FormGroup;
  protected title = 'genaralinsurancemanagementsystem';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.routingForm = this.formBuilder.group({
      routing: ['']
    });

    this.visitRouter();

  }

  visitRouter() {
    const route = this.routingForm.value.routing;
    if (route) {
      this.router.navigate([`/${route}`]);
    }
  }

  
}
