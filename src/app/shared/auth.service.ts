import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { sign } from '../data-types';
import { GoogleAuthProvider } from 'firebase/auth'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false
  isLogin = new BehaviorSubject<boolean>(false)
  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    if (localStorage.getItem('user') !== null) {
      this.isLogin.next(true)
      this.isLoggedIn = true
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.isLoggedIn = true
        this.isLogin.next(true)
        this.router.navigate(['dashboard'])

      })
      .catch((error) => {
        console.log(error);
      });
  }
  // login

  async login(data: sign) {
    await this.fireAuth.signInWithEmailAndPassword(data.email, data.password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
      this.isLoggedIn = true
      this.isLogin.next(true)
      this.router.navigate(['dashboard'])
    }, err => {
      alert("something went wrong")
      this.router.navigate(['login']);

    })
  }
  // register
  async register(data: sign) {
    await this.fireAuth.createUserWithEmailAndPassword(data.email, data.password).then(res => {
      console.log("logged in")
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigate(['login'])
      this.isLogin.next(true)
      this.isLoggedIn = true

    }, err => {
      alert("something went wrong")
      this.router.navigate(['register']);

    })
  }

  // // logout
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['login'])
      this.isLogin.next(false)
      this.isLoggedIn = false
    }, err => {
      alert(err.message)
    })
  }
}
