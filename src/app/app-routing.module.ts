import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { eventListComponent } from "./Event/event-list.component";
import { CategoryListComponent } from './category/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './security/login.component';
const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'products', 
    component: eventListComponent
  },
  
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
