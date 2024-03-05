
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuseridService {
  private userProfileUrl = 'http://localhost:3000/user/profile';

  constructor(private http: HttpClient) { }

  getUserId(): Observable<any> {
    // Get the JWT token from local storage
    const token = localStorage.getItem('jwtToken');
    console.log('JWT token:', token); // Log the JWT token
  
    // Create headers with Authorization header containing the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Make HTTP GET request with headers
    return this.http.get<any>(this.userProfileUrl, { headers });
  }
  
}
