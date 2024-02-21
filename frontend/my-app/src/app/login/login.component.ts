import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    //reactive fourm
    loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  
    constructor(private http: HttpClient) {

    }

    submitApplication() {
      const obj = this.loginForm.value;
      console.log(obj);
    
      this.http.post<any>('http://localhost:3000/auth/login', obj)
        .pipe(
          catchError(error => {
            // Handle errors here
            console.error('An error occurred:', error);
            // Re-throw the error to propagate it further
            throw error;
          })
        )
        .subscribe({
          next: response => {
            // Handle the response here
            console.log(response);
          }
        });
    }

  }


