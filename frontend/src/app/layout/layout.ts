import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
isCollapsed = false;
isMobileOpen = false;
user: any;
username: string = '';
constructor(private router: Router) {}

toggleSidebar() {
  if (window.innerWidth <= 768) {
    this.isMobileOpen = !this.isMobileOpen;
  } else {
    this.isCollapsed = !this.isCollapsed;
  }
}
ngOnInit() {

  const data = localStorage.getItem('user');

  if (data) {

    this.user = JSON.parse(data);

    this.username = this.user.name;

  }

}
logout() {

  localStorage.clear();

  this.router.navigate(['/login']);

}
}
