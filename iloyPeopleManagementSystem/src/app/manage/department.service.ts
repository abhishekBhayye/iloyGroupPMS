import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private departmentInfo: Department[] = [];

  constructor(private http: HttpClient) {

  }

  getDepartmentInfo() {
    return this.http.get<Department[]>('http://localhost:3000/departmentInfo');
  }

}
