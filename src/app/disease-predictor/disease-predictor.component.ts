import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectivityService } from '../shared/connectivity.service';

import { ChartComponent } from "ng-apexcharts";


@Component({
  selector: 'app-disease-predictor',
  templateUrl: './disease-predictor.component.html',
  styleUrls: ['./disease-predictor.component.css']
})
export class DiseasePredictorComponent implements OnInit {
  names = ['back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
    'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
    'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
    'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
    'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
    'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
    'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
    'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
    'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
    'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
    'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
    'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
    'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
    'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
    'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
    'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
    'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf',
    'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
    'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
    'yellow_crust_ooze'];
  list: any
  lengthId = 0
  showResult: boolean = false;

  constructor(private connect: ConnectivityService) {





  }


  t1 = 0
  t2 = 0
  t3 = 0
  p1 = ''
  p2 = ''
  p3 = ''

  tempResult1 = ""
  tempResult2 = ""
  tempResult3 = ""
  tempArr: any = []
  v1 = 0
  v2 = 0
  v3 = 0
  tempSet = new Set()
  elementCount(arr: any, element: any) {
    return arr.filter((currentElement: any) => currentElement == element).length;
  };
  chartOptions = {}
  printData() {
    this.connect.get_post_request().subscribe((data) => {
      this.list = data
      this.tempResult1 = ''
      this.tempResult2 = ''
      this.tempResult3 = ''
      this.tempArr = []
      this.tempSet.clear()
      this.v1 = 0
      this.v2 = 0
      this.v3 = 0

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id == this.list.length) {
          this.tempResult1 = this.list[i].result1.answer1
          this.tempResult2 = this.list[i].result2.answer2
          this.tempResult3 = this.list[i].result3.answer3

        }

      }
      this.tempArr.push(this.tempResult1)
      this.tempArr.push(this.tempResult2)
      this.tempArr.push(this.tempResult3)
      this.v1 = this.elementCount(this.tempArr, this.tempResult1)
      this.v2 = this.elementCount(this.tempArr, this.tempResult2)
      this.v3 = this.elementCount(this.tempArr, this.tempResult3)

      this.tempSet.add(this.tempResult1)
      this.tempSet.add(this.v1)
      this.tempSet.add(this.tempResult2)
      this.tempSet.add(this.v2)
      this.tempSet.add(this.tempResult3)
      this.tempSet.add(this.v3)

      this.tempArr = []
      const myItr = this.tempSet.values()
      for (const entry of myItr) {
        this.tempArr.push(entry)
      }

      if (this.tempArr.length == 6) {
        this.t1 = this.tempArr[1]
        this.t2 = this.tempArr[3]
        this.t3 = this.tempArr[5]
        this.p1 = this.tempArr[0]
        this.p2 = this.tempArr[2]
        this.p3 = this.tempArr[4]
      }
      else if (this.tempArr.length == 4) {
        this.t1 = this.tempArr[1]
        this.t2 = this.tempArr[3]
        this.p1 = this.tempArr[0]
        this.p2 = this.tempArr[2]
      }
      else {
        this.t1 = this.tempArr[1]
        this.t1 = this.tempArr[0]
      }
      console.log(this.tempArr)
      console.log(this.p1, this.p2, this.p3)
      this.lengthId = this.list.length
      this.showResult = true


      this.chartOptions = {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "Predicted Result"
        },
        data: [{
          type: "pie",
          startAngle: 45,
          indexLabel: "{name}:{y}",
          indexLabelPlacement: "inside",
          yValueFormatString: "#,###.##'%'",
          dataPoints: [
            { y: this.t1 / 3 * 100, name: this.p1 },
            { y: this.t2 / 3 * 100, name: this.p2 },
            { y: this.t3 / 3 * 100, name: this.p3 },

          ]
        }]
      }
    })
  }



  async getData(data: object) {
    await this.connect.send_post_request(data).subscribe()

    this.printData()

  }



  ngOnInit(): void {
    console.log(this.tempArr)
  }


}
