import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Student } from '../../model/student.model';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../service/location.service';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-updatestudent',
  standalone: false,
  templateUrl: './updatestudent.html',
  styleUrl: './updatestudent.css'
})
export class Updatestudent implements OnInit {

  id: string = '';
  student: Student = new Student();
  locations: Location[]=[];

  constructor(
    private studentservice: StudentService,
    private router: Router,
    private rout: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.loadStudentById();
    this.loadLocation();
  }

  loadStudentById() {

    this.id = this.rout.snapshot.params['id'];
    this.studentservice.getStudentById(this.id).subscribe({

      next: (res) => {
        this.student = res;
        this.cdr.markForCheck();
      },
      error: (error) => {

      }
    })
  }

  updateStudent(): void {
    this.studentservice.updateStudent(this.id, this.student).subscribe({

      next: () => {
        this.router.navigate(['/allstu']);
      },
      error: () => {

      }
    })

  }

  loadLocation(): void{
    this.locationService.getAllLocation().subscribe({
      next:(loc)=>{
        this.locations=loc;
        this.cdr.markForCheck();
      },
      error:()=>{

      }
    })
  }

  compareLocation(l1: Location, l2: Location):boolean{
    return l1 && l2 ? l1.id===l2.id : l1===l2;
  }


}
