import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { GetuseridService } from '../../getuserid.service';


@Component({
  selector: 'app-recenttrans',
  standalone: true,
  imports: [CommonModule, MatCardModule , MatTableModule],
  templateUrl: './recenttrans.component.html',
  styleUrl: './recenttrans.component.css'
})
export class RecenttransComponent implements OnInit {

  recentTransactions: any[] = [];
  userId: number | undefined;

  constructor(private http: HttpClient, private GetuseridService:  GetuseridService) { }

  async ngOnInit(): Promise<void> {
    this.GetuseridService.extractUserId().subscribe({
      next: (userId: number) => {
        this.userId = userId;
        console.log('Received user ID:', this.userId); // Log the received user ID
        // Now that we have the userId, fetch recent transactions
        if (this.userId !== undefined) {
          this.fetchRecentTransactions(this.userId);
        } else {
          console.error('Failed to get user ID.');
        }
      },
      error: (error) => {
        console.error('Error extracting user ID:', error);
      }
    });
  }
  
  fetchRecentTransactions(userId: number): void {
    console.log('Fetching recent transactions for user ID:', userId); // Log the user ID used for fetching transactions
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