import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, map, retry } from 'rxjs/operators';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private departmentInfo: Department[] = [];
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }

  getDepartmentInfo() {
    return this.http.get<Department[]>('https://ngdepartmentserver.herokuapp.com/departmentInfo');
  }

  updateDepartmentInfo(department: any): Observable<any> {
    return this.http.put('https://ngdepartmentserver.herokuapp.com/departmentInfo', department, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
