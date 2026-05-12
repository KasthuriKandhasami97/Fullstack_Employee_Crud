import { Component, EventEmitter,OnChanges,SimpleChanges, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnChanges {

  @Input() employee: any = {};
  loading = false;

  @Output() save = new EventEmitter();

submitForm(form: any) {

  if (form.invalid) {

    form.control.markAllAsTouched();

    return;

  }

  this.loading = true;

  this.save.emit({
    data: this.employee,
    form
  });

}
ngOnChanges(
  changes: SimpleChanges
) {

  // STOP SPINNER
  this.loading = false;

}
}