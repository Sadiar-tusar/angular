import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Student } from '../../model/student.model';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatestudent',
  standalone: false,
  templateUrl: './updatestudent.html',
  styleUrl: './updatestudent.css'
})
export class Updatestudent implements OnInit {

  id: string = '';
  student: Student = new Student();

  constructor(
    private studentservice: StudentService,
    private router: Router,
    private rout: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStudentById();
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


}
