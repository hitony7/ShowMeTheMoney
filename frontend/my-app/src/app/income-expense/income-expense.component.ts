import { Component, OnInit } from '@angular/core';
import { UserloadService } from '../dashboard/userload.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { flush } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule , MatButtonModule, MatSidenavModule, RouterLink],
  templateUrl: './income-expense.component.html',
  styleUrl: './income-expense.component.css'
})
export class IncomeExpenseComponent implements OnInit {
  userProfile: any;
  showProfileContent: boolean = true;
  showFiller = false;

  constructor(private userloadService: UserloadService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  onToggleSidenav() {
    this.showProfileContent = !this.showProfileContent;
  }

  logout(){
    
  }

  addincome(){
    
  }
  
  addexpense(){
    
  }


  loadUserProfile(): void {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
    if (token) {
      this.userloadService.loadUserProfile(token)
        .subscribe({
          next: (response) => {
            this.userProfile = response; // Assuming the response contains user profile data
            console.log(response);
            // Handle user profile data here
          },
          error: (error) => {
            console.error('Failed to load user profile:', error);
            // Handle error loading user profile
          }
        });
    } else {
      console.error('JWT token not found in local storage');
      // Handle case where JWT token is not found in local storage
    }
  }
}