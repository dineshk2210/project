import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'project';

  showSideNav = false
  onSide() {
    this.showSideNav = !this.showSideNav;
  }
  ngOninit() {
    this.showSideNav = !this.showSideNav;
  }

}
