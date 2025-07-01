import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation',
  standalone: false,
  templateUrl: './addlocation.html',
  styleUrl: './addlocation.css'
})
export class Addlocation implements OnInit{

  formGroup !: FormGroup;

  constructor(private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}
  ngOnInit(): void {
   this.formGroup=this.formBuilder.group({

    name:[''],
    photo:['']
   });
  }

  addLocation(): void{

    const location ={...this.formGroup.value};

    this.locationService.saveLocation(location).subscribe({

      next:(res)=>{

        console.log("Location Saved",res);
        this.formGroup.reset();
        this.router.navigate(['/alloc']);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }



}
