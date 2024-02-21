import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', credentials)
      .pipe(
        catchError(error => {
          // Handle errors here
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }
}
