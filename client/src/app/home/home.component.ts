import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StudentComponent } from '../modals/student/student.component';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

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

  open(){
    const config: ModalOptions = { class: 'modal-lg' };
    
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
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
}
