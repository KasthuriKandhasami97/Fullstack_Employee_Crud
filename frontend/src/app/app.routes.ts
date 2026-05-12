import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { EmployeeList } from './components/employee-list/employee-list';
import { Layout } from './layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { EmployeeDetails } from './components/employee-details/employee-details';

export const routes: Routes = [

  // 🔐 Auth pages (NO sidebar)
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🏠 Main layout (WITH sidebar)
  {
    path: '',
    component: Layout,
    canActivate:[authGuard],
    children: [
      { path: 'dashboard', component: Dashboard,
        canActivate:[adminGuard]
      },
      { path: 'employees', component: EmployeeList },
      {path: 'employee-details/:id', component: EmployeeDetails},
      { path: 'profile', component: Profile },

      // default inside layout
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // fallback
  { path: '**', redirectTo: 'login' }
];