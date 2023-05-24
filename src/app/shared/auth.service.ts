import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { sign } from '../data-types';
import { GoogleAuthProvider } from 'firebase/auth'
import { BehaviorSubject } from 'rxjs';
import { ConnectivityService } from './connectivity.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  

  isLoggedIn: boolean = false
  isLogin = new BehaviorSubject<boolean>(false)
  constructor(private fireAuth: AngularFireAuth,private connect:ConnectivityService, private router: Router) {
    
    if (localStorage.getItem('user') !== null) {
      this.isLogin.next(true)
      this.isLoggedIn = true

      let data
      let uid:any
      let email:any
      let photoURL:any
      let displayName:any
      data=JSON.parse(localStorage.getItem('user')||"{}")
      uid=data.uid
      email=data.email
      photoURL=data.photoURL
      displayName=data.displayName
      let all_user:any
      this.connect.get_user().subscribe((data)=>{
        all_user=data
        // console.log(all_user)
        let t=false
        for(let i=0;i<all_user.length;i++)
        {
          if(all_user[i].uid===uid){
          t=true
          break
          }
          

        }
        if(t==false)
        {
          this.connect.post_user({"uid":uid, "email":email, "photoURL":photoURL,"displayName":displayName}).subscribe()
          
        }
       
        
      })
     
     }
    
  }


  add_user(){
   
  }

  async GoogleAuth() {
    await this.AuthLogin(new GoogleAuthProvider());
   
  }

  async AuthLogin(provider: any) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.isLoggedIn = true
        this.isLogin.next(true)
        this.router.navigate(['register2'])

      })
      .catch((error) => {
        console.log(error);
      });
    
      
      // uid=data.uid
      // email=data.email
      
  }
  // login

  async login(data: sign) {
    await this.fireAuth.signInWithEmailAndPassword(data.email, data.password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
      this.isLoggedIn = true
      this.isLogin.next(true)
      this.router.navigate(['register2'])
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
