import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFormComponent],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  paginatedEmployees: any[] = [];

  loading = false;
  selectedEmployee: any = {};

  selectedStatus = '';
  searchText = '';

  // PAGINATION
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private empService: EmployeeService,
    private toastr: ToastrService,
    private router: Router,
    private cd:ChangeDetectorRef

  ) {}

ngOnInit(): void {

  this.filteredEmployees = [];


  this.getEmployees();

}
  // GET EMPLOYEES
getEmployees() {

  this.empService
    .getEmployees()
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.employees =
          Array.isArray(res)
            ? res
            : [];

        this.filteredEmployees =
          [...this.employees];

        // LOAD FIRST 5
        this.updatePagination();

        // REFRESH UI
        this.cd.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

}
updatePagination() {

  const start =
    (this.currentPage - 1)
    * this.itemsPerPage;

  const end =
    start + this.itemsPerPage;

  this.paginatedEmployees =
    this.filteredEmployees.slice(
      start,
      end
    );

}
viewEmployee(id: string) {

  this.router.navigate([
    '/employee-details',
    id
  ]);

}

  // SEARCH + FILTER
filterEmployees() {

  let data =
    [...this.employees];

  // STATUS FILTER
  if (this.selectedStatus) {

    data = data.filter(
      emp =>
        emp.status ===
        this.selectedStatus
    );

  }

  // SEARCH FILTER
  if (this.searchText.trim()) {

    const search =
      this.searchText.toLowerCase();

    data = data.filter((emp: any) =>

      emp.name
        ?.toLowerCase()
        .includes(search)

      ||

      emp.email
        ?.toLowerCase()
        .includes(search)

    );

  }

  this.filteredEmployees =
    data;

  // RESET PAGE
  this.currentPage = 1;

  // UPDATE TABLE
  this.updatePagination();

}


nextPage() {

  if (
    this.currentPage <
    this.totalPages
  ) {

    this.currentPage++;

    this.updatePagination();

  }

}
prevPage() {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.updatePagination();

  }

}

  get totalPages(): number {

    return Math.ceil(
      this.filteredEmployees.length /
      this.itemsPerPage
    );

  }
  // SAVE EMPLOYEE
saveEmployee(event: any) {

  const data = event.data;

  const form = event.form;

  if (this.loading) return;

  this.loading = true;

  // ================= UPDATE =================
  if (data._id) {

    this.empService
      .updateEmployee(data._id, data)
      .subscribe({

        next: () => {

          this.toastr.success(
            'Employee Updated Successfully'
          );

          // RESET FORM
          this.selectedEmployee = {
            status: ''
          };

          form.resetForm();

          // RELOAD TABLE
          this.getEmployees();

          // STOP LOADING
          this.loading = false;

        },

        error: () => {

          this.toastr.error(
            'Update Failed'
          );

          this.loading = false;

        }

      });

  }

  // ================= ADD =================
  else {

    this.empService
      .addEmployee(data)
      .subscribe({

        next: () => {

          this.toastr.success(
            'Employee Added Successfully'
          );

          // RESET FORM
          this.selectedEmployee = {
            status: ''
          };

          form.resetForm();

          // RELOAD TABLE
          this.getEmployees();

          // STOP LOADING
          this.loading = false;

        },

        error: () => {

          this.toastr.error(
            'Save Failed'
          );

          this.loading = false;

        }

      });

  }

}

  // =========================
  // EDIT
  // =========================
  edit(emp: any) {

    this.selectedEmployee = {
      ...emp
    };

  }

  // =========================
  // DELETE
  // =========================
 deleteEmployee(id: string) {

  if (confirm('Delete Employee?')) {

    this.empService.deleteEmployee(id)
      .subscribe({

       next: () => {

          this.toastr.success(
            'Employee Deleted Successfully'
          );

          // REFRESH TABLE
          this.getEmployees();

        },

        error: () => {

          this.toastr.error(
            'Delete Failed'
          );
        }

      });

  }

}

}