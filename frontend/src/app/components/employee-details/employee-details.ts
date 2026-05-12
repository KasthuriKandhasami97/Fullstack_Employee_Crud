import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { EmployeeService }
from '../../services/employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails
implements OnInit {

  employee: any = {};

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    console.log('ID:', id);

    if (!id) {

      this.loading = false;

      return;

    }

    this.empService
      .getEmployeeById(id)
      .subscribe({

        next: (res: any) => {

          console.log('API DATA:', res);

          this.employee = res;

          this.loading = false;

          // FORCE UI UPDATE
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }
downloadPDF() {

  window.print();

}

  goBack() {

    this.router.navigate([
      '/employees'
    ]);

  }

}