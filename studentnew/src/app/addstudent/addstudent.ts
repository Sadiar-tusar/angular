import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../model/student.model';
import { Location } from '../../model/location.model';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-addstudent',
  standalone: false,
  templateUrl: './addstudent.html',
  styleUrl: './addstudent.css'
})
export class Addstudent implements OnInit {

  locations: Location[]=[];

  formGroup!: FormGroup;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      fee: [''],
      location:this.formBuilder.group({

    name:[''],
    photo:['']
    })
  });

  this.loadLocation();

  this.formGroup.get('location')?.get('name')?.valueChanges.subscribe(name=>{
    const selectedLocation= this.locations.find(loc => loc.name===name);
    if(selectedLocation){
      this.formGroup.patchValue({location: selectedLocation});
    }
  });
    
  }

  loadLocation(): void{
    this.locationService.getAllLocation().subscribe({
      next:(loc)=>{
        this.locations=loc;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }




  addStudent(): void {

    if(this.formGroup.invalid){
      return;
    }

    const student: Student = { ...this.formGroup.value };

    this.studentService.saveStudent(student).subscribe({

      next: (res) => {

        console.log("Student Saved",res);
        this.loadLocation();
        this.formGroup.reset();
        this.router.navigate(['/allstu']);

      },

      error: (error) => {
        console.log("Error Saving Student",error);

      }

    });

  }


}
