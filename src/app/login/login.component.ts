import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { sign } from '../data-types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  @Input() showSideNav: boolean = false
  isSignedIn = false

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true
  }
  async login(data: sign) {

    await this.auth.login(data)
    if (this.auth.isLoggedIn)
      this.isSignedIn = true
  }

}
