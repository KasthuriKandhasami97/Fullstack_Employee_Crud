import {
  Component,
  OnInit,
    ChangeDetectorRef
} from '@angular/core';

import { EmployeeService } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  user: any = {

    name: '',
    email: '',
    password: ''

  };
selectedFile!: File;
imagePreview: string | ArrayBuffer | null = null;
  showPassword = false;

  constructor(
    private service: EmployeeService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.getProfile();

  }
// OPEN FILE ON CLICK + PREVIEW IMAGE
onFileSelected(event: any) {

  const file = event.target.files[0];

  if (!file) return;

  this.selectedFile = file;

  const reader = new FileReader();

  reader.onload = () => {
    this.imagePreview = reader.result;
  };

  reader.readAsDataURL(file);
}
  // GET PROFILE
  getProfile() {

    this.service.getProfile().subscribe({

      next: (res: any) => {

        this.user.name =
          res.name || '';

        this.user.email =
          res.email || '';

        // IMPORTANT
        this.user.password = '';
                this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // UPDATE PROFILE
  updateProfile() {

    // NAME VALIDATION
    if (!this.user.name.trim()) {

      this.toastr.error(
        'Name is required'
      );

      return;

    }

    // EMAIL VALIDATION
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(this.user.email)) {

      this.toastr.error(
        'Enter valid email'
      );

      return;

    }

    // PASSWORD VALIDATION
    if (
      this.user.password &&
      this.user.password.length < 5
    ) {

      this.toastr.error(
        'Password minimum 5 characters'
      );

      return;

    }

    const data = {

      name: this.user.name,
      email: this.user.email,
      password: this.user.password

    };

    this.service.updateProfile(data).subscribe({

      next: () => {

        this.toastr.success(
          'Profile Updated Successfully'
        );
        this.getProfile()
      },

      error: (err) => {

        console.log(err);

        this.toastr.error(
          err.error.message || 'Update Failed'
        );

      }

    });

  }

}