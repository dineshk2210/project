import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/posts'
  server_address = "http://localhost:5000"
  send_post_request(data: object) {
    return this.http.post(
      this.server_address,
      JSON.stringify(data)
    )
  }

  get_post_request() {
    return this.http.get(this.apiUrl)
  }

}