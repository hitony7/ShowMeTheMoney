import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloadService {
  getToken() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  loadUserProfile(jwtToken: string): Observable<any> {
    const url = 'http://localhost:3000/user/profile';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.get<any>(url, { headers });
  }
}
