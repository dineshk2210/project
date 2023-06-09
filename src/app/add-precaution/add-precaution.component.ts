import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../shared/connectivity.service';
import { Router } from '@angular/router';
// import data from  './../../../backend/'

@Component({
  selector: 'app-add-precaution',
  templateUrl: './add-precaution.component.html',
  styleUrls: ['./add-precaution.component.css']
})
export class AddPrecautionComponent implements OnInit {

  constructor(private connect: ConnectivityService, private router: Router) { }

  post_success = ""
  ngOnInit(): void {
  }

  async getResult(data: object) {
    console.log(data)
    await this.connect.send_data_post(data).subscribe()
    this.post_success = "Data Added successfully"

  }
  update(data: string) {
    this.connect.update(data).subscribe()
    this.router.navigate(['disease-predictor'])
  }
}
