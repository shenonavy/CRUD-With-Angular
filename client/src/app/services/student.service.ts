import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'https://localhost:5001/api/students/';

  constructor(private http: HttpClient) { }

  create(student: Student){
    return this.http.post<Student>(this.baseUrl + 'create', student).pipe(
      map(response => {
        return response;
      })
    )
  }

  getAllStudents(){
    return this.http.get<Student[]>(this.baseUrl + 'getAll').pipe(
      map(response => {
        return response;
      })
    )
  }

  getStudentById(id: number){
    return this.http.get<Student>(this.baseUrl + 'get-student/' + id).pipe(
      map(response => {
        return response;
      })
    )
  }

  updateStudent(student: Student){
    return this.http.put<Student>(this.baseUrl + 'update', student).pipe(
      map(response => {
        return response;
      })
    )
  }

  deleteStudentById(id: number){
    return this.http.delete<boolean>(this.baseUrl + 'delete/' + id).pipe(
      map(response => {
        return response;
      })
    )
  }
}
