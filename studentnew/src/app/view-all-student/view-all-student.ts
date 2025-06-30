import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../../model/student.model';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit {
  students: any;
  

  constructor(private studentservice: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef
   
  ) { }
  ngOnInit(): void {
    this.loadAllData();
  }
  loadAllData():void {
this.students=this.studentservice.getAllStudent().subscribe({
  next:(res)=>{
    
  },
  error:(error)=>{

  }
})
   
    }

  

  deleteStudent(id: string): void {
    this.studentservice.deleteStudent(id).subscribe({

      next: () => {
        this.loadAllData();
        this.cdr.reattach();
      },
      error: (error) => {

      }
    })

  }

  getStudentById(id: string): void{
this.studentservice.getStudentById(id).subscribe({

  next: () => {
        this.loadAllData();
        this.router.navigate(['/updatestudent',id])
      },
      error: (error) => {

      }
})
  }

}
