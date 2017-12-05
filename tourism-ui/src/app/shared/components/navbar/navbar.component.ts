import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  isAuthenticated: boolean = false;

  onLogin(): void {
    this.isAuthenticated = true;
  }

  onLogout(): void {
    this.isAuthenticated = false;
  }
}
