import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/posts'
  dataUrl = 'http://localhost:3000/comments'
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
  send_data_post(data: object) {
    return this.http.post(this.dataUrl, data)
  }
  get_data_post() {
    return this.http.get(this.dataUrl)
  }

}