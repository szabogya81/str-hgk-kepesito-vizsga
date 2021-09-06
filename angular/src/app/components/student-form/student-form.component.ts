import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from 'src/app/models/student';
import { StudentHttpService } from 'src/app/service/student-http.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  reactForm: FormGroup;

  studentlId: string;
  studentForm: Student = {firstName: "", lastName: "", email: "", classroom: { name: ""}}

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentHttpService,
    private router: Router) { }

    ngOnInit(): void {
      this.studentlId = this.route.snapshot.params.id;
      if(this.studentlId){
        this.studentService.getById(this.studentlId).subscribe(
          data => {
            this.studentForm = data;
          }
        )
      }
    }
  
    saveStudent(form: NgForm){
      if(this.studentlId){
        this.studentService.update(form.value, this.studentlId).subscribe(
          student => this.router.navigate(['student-list']),
          err => console.error(err)
        )
      }else {
        this.studentService.save(form.value).subscribe(
          student => this.router.navigate(['school-list']),
          err => console.error(err)
        )
      }
  
    }

}
