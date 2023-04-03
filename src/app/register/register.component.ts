import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { sign } from '../data-types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() showSideNav: boolean = false
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  async register(data: sign) {

    await this.auth.register(data)

  }

}