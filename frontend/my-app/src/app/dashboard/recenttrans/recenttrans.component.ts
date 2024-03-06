import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-recenttrans',
  standalone: true,
  imports: [CommonModule, MatCardModule , MatTableModule],
  templateUrl: './recenttrans.component.html',
  styleUrl: './recenttrans.component.css'
})
export class RecenttransComponent implements OnInit {

  recentTransactions: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const userId = 8; // Replace with the actual user ID or get it dynamically

    this.http.get<any>(`http://localhost:3000/income/recenttransaction/${userId}`).subscribe(
      (data) => {
        if (data && data.success) {
          this.recentTransactions = data.data;
        } else {
          console.error('Failed to fetch recent transactions:', data.error);
        }
      },
      (error) => {
        console.error('Failed to fetch recent transactions:', error);
      }
    );
  }

  isExpense(transaction: any): boolean {
    return transaction.category !== undefined;
  }
}