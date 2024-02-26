import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  constructor(private authService: AuthService) {} // Inject AuthService

  submitApplication() {
    const obj = this.loginForm.value;
    console.log(obj);
    
    this.authService.login(obj)
      .subscribe({
        next: response => {
          console.log('Login successful!');
          // Assuming your JWT token is returned as 'token' in the response
          const jwtToken = response.token;
          // Now you can store the JWT token in local storage or a cookie (in this case local)
          localStorage.setItem('jwtToken', jwtToken);
          // Then, redirect the user Dashboard page
        }
      });
  }
 

  
}
