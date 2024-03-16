import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root'
})
export class GetuseridService {
  private userProfileUrl = 'http://localhost:3000/user/profile';

  constructor(private http: HttpClient) { }

  getUserId(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    console.log('JWT token:', token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.userProfileUrl, { headers });
  }

  // Modified method to extract user ID as a number
  extractUserId(): Observable<number> {
    return this.getUserId().pipe(
      //tap(response => console.log('Received user ID response:', response)), // Log the received response
      map(response => {
        const userId = typeof response.user_id === 'number' ? response.user_id : parseInt(response.user_id, 10); // Ensure the user_id is parsed as a number
       // console.log('Converted user ID:', userId); // Log the converted user ID
        return userId;
      })
    );
  }
  
  



}