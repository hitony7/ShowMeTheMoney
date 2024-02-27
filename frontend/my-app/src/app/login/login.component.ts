import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;
 // errorMessage: string | undefined;
  errorMessagetext: string = "";
  errorMessage: boolean = false; 

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  constructor(private authService: AuthService , private router: Router) {} // Inject AuthService

  submitApplication() {
    const obj = this.loginForm.value;
    console.log(obj);

    this.authService.login(obj)
      .pipe(
        catchError(error => {
          console.error('Login failed:', error);

          // Handle different types of errors and set appropriate error messages
          if (error.status === 401) {
            this.errorMessage = true;
            this.errorMessagetext = 'Invalid email or password.';
          } else if (error.status === 403) {
            this.errorMessage = true;
            this.errorMessagetext = 'Access forbidden.';
          } else {
            this.errorMessage = true;
            this.errorMessagetext = 'An error occurred. Please try again later.';
          }
          
          return throwError(error); // Rethrow the error
        })
      )
      .subscribe({
        next: response => {
          console.log('Login successful!');
          // Assuming your JWT token is returned as 'token' in the response
          const jwtToken = response.token;
          // Now you can store the JWT token in local storage or a cookie (in this case local)
          localStorage.setItem('jwtToken', jwtToken);
          // Redirect the user to the Dashboard page
          this.router.navigate(['/dashboard']); // Change '/dashboard' to the appropriate route
        }
      });
  }
}
 

  

function throwError(error: any): any {
  throw new Error('Function not implemented.');
}

