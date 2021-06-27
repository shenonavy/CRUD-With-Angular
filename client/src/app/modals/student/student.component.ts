import { formatDate } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  clickevent = new EventEmitter();
  registerForm!: FormGroup;
  validationErrors: string[] = [];
  formMode!: boolean;
  studentId!: number;

  constructor(public bsModalRef: BsModalRef, private studentService: StudentService) { }

  ngOnInit(): void {
    this.formInit();
    this.loadDataById();
  }

  formInit(){
    this.registerForm = new FormGroup({
      stuId: new FormControl(this.studentId),
      stuName: new FormControl('', Validators.required),
      stuGender: new FormControl('M', Validators.required),
      stuAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      stuContactNumber: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      stuDOB: new FormControl('', Validators.required)
    })
  }

  save(){
    if(this.registerForm.valid){
      this.validationErrors = [];
      if(this.formMode){
        this.studentService.updateStudent(this.registerForm.value).subscribe(result => {
          this.clickevent.emit(null);
          Swal.fire('200', 'Student successfully updated!', 'success');
        }, error => {
          if(typeof(error.error) === 'object' && error.error !== null){
            for(const key in error.error){
              if(error.error[key]){
                this.validationErrors.push(error.error[key])
              }
            }
            this.validationErrors.flat();
          } else if (typeof(error) === 'object' && error.error !== null){
            Swal.fire(`${error.status}`, error.error, 'error');
          } else{
            Swal.fire(`${error.status}`, error.statusText, 'error');
          }
        })
      } else{
        this.studentService.create(this.registerForm.value).subscribe(result => {
          this.clickevent.emit(null);
          this.registerForm.reset();
          Swal.fire('200', 'Student successfully added!', 'success');
        }, error => {
          if(typeof(error.error) === 'object' && error.error !== null){
            for(const key in error.error){
              if(error.error[key]){
                this.validationErrors.push(error.error[key])
              }
            }
            this.validationErrors.flat();
          } else if (typeof(error) === 'object' && error.error !== null){
            Swal.fire(`${error.status}`, error.error, 'error');
          } else{
            Swal.fire(`${error.status}`, error.statusText, 'error');
          }
        })
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  loadDataById(){
    if(this.formMode){
      this.studentService.getStudentById(this.studentId).subscribe(result => {
        this.setValues(result);
      })
    }
  }

  setValues(student: Student){
    this.registerForm.controls['stuId'].setValue(student.stuId);
    this.registerForm.controls['stuName'].setValue(student.stuName);
    this.registerForm.controls['stuGender'].setValue(student.stuGender);
    this.registerForm.controls['stuAddress'].setValue(student.stuAddress);
    this.registerForm.controls['stuContactNumber'].setValue(student.stuContactNumber);
    this.registerForm.controls['stuDOB'].setValue(formatDate(student.stuDOB,'dd/MM/YYYY','en'));
  }

}
