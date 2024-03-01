import { Routes, mapToCanActivate } from '@angular/router';
import { LoginpageComponent } from './login/loginpage/loginpage.component'
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { IncomeExpenseComponent} from './income-expense/income-expense.component';
import { AssetsLiabilitiesComponent } from './assets-liabilities/assets-liabilities.component';
import { SavingsGoalComponent } from './savings-goal/savings-goal.component';

import { authGuard } from './dashboard/auth.guard';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path:'', component:HomeComponent} ,  
    { path:'login', component:LoginpageComponent},
    { path:'register', component:RegisterComponent},
    { path: 'dashboard', component:DashboardComponent , canActivate: [authGuard]},
    { path: 'assets-liabilities', component:AssetsLiabilitiesComponent , canActivate: [authGuard]},
    { path: 'income-expense', component:IncomeExpenseComponent,canActivate: [authGuard]},
    { path: 'savings-goal', component:SavingsGoalComponent,canActivate: [authGuard]},

];
