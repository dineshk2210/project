import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showSidenav = false
  showSidebar() {
    console.warn("work")
    this.showSidenav = !this.showSidenav

  }
}
