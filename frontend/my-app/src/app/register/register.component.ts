import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterService } from './register.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule, MatFormFieldModule,MatInputModule, MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  registerForm: FormGroup;
  //could use an interface
  constructor(private formBuilder: FormBuilder , private registerService: RegisterService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      hashed_password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerService.registerUser(this.registerForm.value)
        .subscribe(
          response => {
            console.log('Registration successful:', response);
            // Handle successful registration response here
          },
          error => {
            console.error('Registration failed:', error);
            // Handle registration error here
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }

}