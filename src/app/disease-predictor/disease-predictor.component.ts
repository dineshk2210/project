import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease-predictor',
  templateUrl: './disease-predictor.component.html',
  styleUrls: ['./disease-predictor.component.css']
})
export class DiseasePredictorComponent implements OnInit {
  names = ["abc", "sjb", "sjc"];
  showResult: boolean = false;

  constructor() { }

  getData() {
    this.showResult = true;
  }

  ngOnInit(): void {
  }

}
