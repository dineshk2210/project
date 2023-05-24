import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/posts'
  dataUrl = 'http://localhost:3000/Disease_Information'
  server_address = "http://localhost:5000"
  update_address = "http://localhost:5000/update"
  userURL="http://localhost:3000/user"
  sms="http://localhost:5000/sms"

  send_post_request(data: object) {
    console.log("work")
    return this.http.post(
      this.server_address,
      JSON.stringify(data)

    )

  }
  add_additional(id:number,data:any):Observable<any>{

    console.log(id,data)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const url = `${this.userURL}/${id}`
    return this.http.put<any>(url,data ,{ headers: headers })
  }
  get_post_request() {
    return this.http.get(this.apiUrl)
  }
  send_data_post(data: object) {
    return this.http.post(this.dataUrl, data)
  }
  get_data_post() {
    return this.http.get(this.dataUrl)
  }
  update(data: string) {
    return this.http.post(
      this.update_address, JSON.stringify(data)
    )
  }

  // user 

  get_user(){
    return this.http.get(this.userURL)
  }

  post_user(data: object){
    return this.http.post(this.userURL,data)
  }


  // sending information to mobile 

  send_sms(data: object)
  {
    return this.http.post(this.sms,JSON.stringify(data))
  }
}