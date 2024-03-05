import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ApiResponse {
  success: boolean;
  data: any[]; // You might need to replace 'any[]' with a more specific type
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000'; // Base URL of your backend

  constructor(private http: HttpClient) { }

  getIncomeData(userId: number): Observable<any[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/income/${userId}`).pipe(
      map(response => response.data)
    );
  }

  getExpenseData(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/expense/${userId}`);
  }
}
