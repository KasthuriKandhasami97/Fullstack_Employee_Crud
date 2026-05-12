import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { EmployeeService }
from '../../services/employee';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  total = 0;

  active = 0;

  inactive = 0;

  constructor(
    private empService: EmployeeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadStats();

  }

  loadStats() {

    this.empService
      .getStats()
      .subscribe({

        next: (res: any) => {

          console.log('STATS:', res);

          this.total =
            res.total || 0;

          this.active =
            res.active || 0;

          this.inactive =
            res.inactive || 0;

          // FORCE UI UPDATE
          this.cd.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}