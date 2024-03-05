import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetuseridService } from '../../getuserid.service'; // Import GetuseridService
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CONNREFUSED } from 'dns';

import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ ReactiveFormsModule,MatInputModule,MatFormFieldModule, MatIconModule, FormsModule ],
  selector: 'app-add-asset-dialog',
  templateUrl: './add-asset-dialog.component.html',
  styleUrls: ['./add-asset-dialog.component.css']
})
export class AddAssetDialogComponent implements OnInit {
  

  formData = {
    user_id: null,
    category: '',
    amount: null,
    date: '',
    note: ''
  };
  

  constructor(
    public dialogRef: MatDialogRef<AddAssetDialogComponent>,
    private getUserIdService: GetuseridService, // Inject GetuseridService
    private http: HttpClient
  ) { }

  save(): void {
    // Assuming formData is properly populated
    const formData = this.formData;
    console.log("yo")
    console.log(formData);
  
    // Make sure user_id is populated in the formData
    if (formData.user_id === null || formData.user_id === undefined) {
      console.error('user_id is not populated in formData.');
      return;
    }
  
    // Make HTTP POST request to save the asset
    this.http.post(`http://localhost:3000/asset/newEntry`, formData)
      .subscribe({
        next: (response) => {
          console.log('asset saved successfully:', response);
          // Handle success response
        },
        error: (error) => {
          console.error('Error saving asset:', error);
          // Handle error saving asset
        }
      });
  

  }
  
  
  

  ngOnInit(): void {
    // Call getUserId() method from GetuseridService to fetch the user ID
    this.getUserIdService.getUserId()
      .subscribe({
        next: (response) => {
          // Extract user_id from the response
          this.formData.user_id = response.user_id;
          // Assuming you have a method in GetuseridService to load user profile
          // You can directly use the user_id obtained from getUserId() here
          console.log("User ID: ", this.formData.user_id);
          // Handle user profile data here
        },
        error: (error) => {
          console.error('Failed to fetch user ID:', error);
          // Handle error fetching user ID
        }
      });
  }
  

  // Function to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
