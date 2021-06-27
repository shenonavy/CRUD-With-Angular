import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StudentComponent } from '../modals/student/student.component';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bsModalRef!: BsModalRef;
  list: Student[] = [];

  constructor(private modalService: BsModalService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.load();
  }

  open(mode: boolean, id: number){
    const initialState = {
      formMode: mode,
      studentId: id
    };
    this.bsModalRef = this.modalService.show(StudentComponent, {class: 'modal-lg', ignoreBackdropClick: true, initialState});
    this.bsModalRef.content.clickevent.subscribe(() => {
      this.load();
    })
  }

  load(){
    this.studentService.getAllStudents().subscribe(result => {
      this.list = result;
    })
  }

  deleteStudent(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudentById(id).subscribe(result => {
          if(result){
            this.load();
            Swal.fire(
              'Deleted!',
              'Student has been deleted.',
              'success'
            )
          } else{
            Swal.fire('Ops!', 'Insternal error', 'error');
          }
        }, error => {
          Swal.fire(`${error.status}`, error.statusText, 'error');
        })
      }
    })
  }
}
