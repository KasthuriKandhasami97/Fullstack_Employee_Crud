import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   
import { CommonModule } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    loginData = { email: '', password: '' };
    showPassword = false; 
    loading = false;  

constructor(private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {}



login() {

  // VALIDATION
  if (
    !this.loginData.email ||
    !this.loginData.password
  ) {

    this.toastr.error(
      'All fields are required'
    );

    return;

  }

  this.loading = true;

  this.auth.login(this.loginData)
    .subscribe({

      next: (res: any) => {

        // SAVE TOKEN
        localStorage.setItem(
          'token',
          res.token
        );

        // SAVE USER
        localStorage.setItem(
          'user',
          JSON.stringify(res.user)
        );

        // SUCCESS MESSAGE
        this.toastr.success(
          'Login Successful'
        );

        // AUTO LOGOUT AFTER 1 HOUR
        setTimeout(() => {

          localStorage.clear();

          this.router.navigate(['/login']);

          this.toastr.info(
            'Session Expired. Login Again'
          );

        }, 3600000);

        this.loading = false;

        // ROLE CHECK
        setTimeout(() => {

          if (res.user.role === 'admin') {

            this.router.navigate(['/dashboard']);

          } else {

            this.router.navigate(['/profile']);

          }

        }, 1000);

      },

      error: (err) => {

        console.log(err);

        this.toastr.error(
          err.error.message || 'Login Failed'
        );

        this.loading = false;

      }

    });

}
}
