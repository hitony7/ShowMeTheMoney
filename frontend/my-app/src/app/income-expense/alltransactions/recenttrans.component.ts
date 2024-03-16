import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { GetuseridService } from '../../getuserid.service';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatCardModule , MatTableModule],
  templateUrl: './recenttrans.component.html',
  styleUrl: './recenttrans.component.css'
})
export class RecenttransComponent implements OnInit {

  recentTransactions: any[] = [];
  userId: number | undefined;

  constructor(private http: HttpClient, private GetuseridService:GetuseridService) { }

  ngOnInit(): void {
    const userId = this.GetuseridService.extractUserId(); // Replace with the actual user ID or get it dynamically
    
    this.GetuseridService.extractUserId().subscribe({
      next: (userId: number) => {
        this.userId = userId;
        console.log('Received user ID:', this.userId); // Log the received user ID
        // Now that we have the userId, fetch recent transactions
        if (this.userId !== undefined) {
          this.fetchTransactions(this.userId);
        } else {
          console.error('Failed to get user ID.');
        }
      },
      error: (error) => {
        console.error('Error extracting user ID:', error);
      }
    });
  }

 fetchTransactions(userId: any): void {
  this.http.get<any>(`http://localhost:3000/income/alltransactions/${userId}`).subscribe({
    next: (data) => {
      if (data && data.success) {
        this.recentTransactions = data.data;
      } else {
        console.error('Failed to fetch recent transactions:', data.error);
      }
    },
    error: (error) => {
      console.error('Failed to fetch recent transactions:', error);
    }
  });
}
isExpense(transaction: any): boolean {
  return transaction.category !== undefined;
}

    
  }
    

   

