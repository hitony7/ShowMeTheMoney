import { Routes } from '@angular/router';
import { LoginpageComponent } from './login/loginpage/loginpage.component'
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './dashboard/auth.guard';

export const routes: Routes = [
    { path:'', component:HomeComponent} ,  
    { path:'login', component:LoginpageComponent},
    { path:'register', component:RegisterComponent},
    { path: 'dashboard', component:DashboardComponent , canActivate: [authGuard]}
];
