import { Component, OnInit } from '@angular/core';
import { UserloadService } from '../dashboard/userload.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { flush } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { AddLiabilitiesDialogComponent } from './add-liabilities-dialog-component/add-liabilities-dialog.component';
import { AddAssetDialogComponent } from './add-asset-dialog-component/add-asset-dialog.component';

@Component({
  selector: 'app-assets-liabilities',
  standalone: true,
  imports: [CommonModule , MatButtonModule, MatSidenavModule, RouterLink],
  templateUrl: './assets-liabilities.component.html',
  styleUrl: './assets-liabilities.component.css'
})
export class AssetsLiabilitiesComponent {

  userProfile: any;
  showProfileContent: boolean = true;
  showFiller = false;

  constructor(private userloadService: UserloadService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  onToggleSidenav() {
    this.showProfileContent = !this.showProfileContent;
  }

  logout(){
        // Remove JWT token from local storage
        localStorage.removeItem('jwtToken');
    
        // Redirect to home page
        window.location.href = './';
        //maybe add pop up for logout
    
  }

  addLiability(){

    const dialogRef = this.dialog.open(AddLiabilitiesDialogComponent, {
      width: '400px' // Adjust the width as needed
    });

  }

  addAsset(){
    const dialogRef = this.dialog.open(AddAssetDialogComponent, {
      width: '400px' // Adjust the width as needed
    });

    
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