import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [NavbarComponent, LoginComponent],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

}
