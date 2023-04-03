import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showSidenav = false
  @Output() SideOpen = new EventEmitter<boolean>();
  showSidebar() {

    this.showSidenav = !this.showSidenav
    this.SideOpen.emit(!this.SideOpen)

  }
}

