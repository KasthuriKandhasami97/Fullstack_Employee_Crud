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

  constructor(private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

 login() {

  this.auth.login(this.loginData)
    .subscribe({

      next: (res) => {

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

        // AUTO LOGOUT AFTER 1 HOUR
        setTimeout(() => {

          localStorage.clear();

          this.router.navigate(['/login']);

          this.toastr.info('Session Expired. Login Again');

        }, 3600000);

        // ROLE CHECK
        if (res.user.role === 'admin') {

          this.router.navigate(['/dashboard']);

        } else {

          this.router.navigate(['/profile']);

        }

      },

      error: () => {

        this.toastr.error('Login Failed');

      }

    });

}
}
