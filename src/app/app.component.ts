import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
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
  backToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
