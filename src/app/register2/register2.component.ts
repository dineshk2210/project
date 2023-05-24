import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../shared/connectivity.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import {} from 'google-maps';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {

  latitude: number = 0
  longitude: number = 0

  constructor(private connect: ConnectivityService, private http: HttpClient, private router: Router) {

  }
  response: any
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude

      })
    }

  }
  async register(data: object) {

    let d: any = data
    await this.connect.get_user().subscribe(e => {
      this.response = e
      for (let i = 0; i < this.response.length; i++) {
        let local_data: any
        local_data = JSON.parse(localStorage.getItem('user') || "{}")
        if (this.response[i].uid === local_data.uid) {
          console.log(this.response[i].email)

          // this.ithis.response[i].id
          let result: any
          result = {
            // 'id':this.response[i].id,
            'uid': this.response[i].uid,
            'email': this.response[i].email,
            'photoURL': this.response[i].photoURL,
            'displayName': this.response[i].displayName,
            'location': {
              "latitude": this.latitude,
              "longitude": this.longitude
            },
            'mobile': d.mobile
            // 'location':data.Location 
          }
          this.connect.add_additional(this.response[i].id, result).subscribe()

        }
        this.router.navigate([''])

      }

    }
    )
    // let result:object
    //     result={
    //       id:this.response[i].id,
    //       location:data.Location,
    //       mobile:data.mobile
    //     }

    console.log(d.Location)





  }







}


// }
