import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  model: any = {};
  list: any[] = [];
  clickevent = new EventEmitter();
  registerForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private studentService: StudentService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.registerForm = new FormGroup({
      stuId: new FormControl(''),
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
      this.studentService.create(this.model).subscribe(result => {
        this.clickevent.emit(null);
        Swal.fire('200', 'Astudent successfully added!', 'success');
      }, error => {
        if(typeof(error.error) === 'object' && error.error !== null){
          const modalStateErrors = [];
          for(const key in error.error){
            if(error.error[key]){
              modalStateErrors.push(error.error[key])
            }
          }
          throw modalStateErrors.flat();
        } else if (typeof(error) === 'object' && error.error !== null){
          Swal.fire(`${error.status}`, error.error, 'error');
        } else{
          Swal.fire(`${error.status}`, error.statusText, 'error');
        }
      })
    } else {
      
    }
  }

  

}
