import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-view-all-student',
  standalone: false,
  templateUrl: './view-all-student.html',
  styleUrl: './view-all-student.css'
})
export class ViewAllStudent implements OnInit{
  students: any;

  constructor(private studentservice:StudentService){}
  ngOnInit(): void {
   this.loadAllStudent();
  }
  loadAllStudent(){
    this.students = this.studentservice.getAllStudent();
  }

}
