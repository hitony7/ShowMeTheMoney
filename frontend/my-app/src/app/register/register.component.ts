import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


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
  constructor(private formBuilder: FormBuilder) {
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
      // Form is valid, proceed with registration logic
      console.log(this.registerForm.value);
      // You can call your service to send the registration data to the server here
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }
}