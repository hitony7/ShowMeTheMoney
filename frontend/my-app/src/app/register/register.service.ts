// register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const url = 'http://localhost:3000/auth/register';
    return this.http.post<any>(url, userData);
  }
}
