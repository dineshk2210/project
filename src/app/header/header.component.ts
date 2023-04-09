import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth: AuthService) {

  }
  showSidenav = false
  showThreeDot = this.auth.isLoggedIn;

  @Output() SideOpen = new EventEmitter<boolean>();
  showSidebar() {

    this.showSidenav = !this.showSidenav
    this.SideOpen.emit(!this.SideOpen)

  }
  logout() {
    this.auth.logout()
  }
}

