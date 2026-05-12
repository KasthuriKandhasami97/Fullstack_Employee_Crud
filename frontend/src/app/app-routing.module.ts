import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { EmployeeList } from './components/employee-list/employee-list';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: EmployeeList }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}