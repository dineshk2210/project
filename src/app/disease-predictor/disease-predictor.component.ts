import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectivityService } from '../shared/connectivity.service';

import { ChartComponent } from "ng-apexcharts";
import { NgForm } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import mapboxgl from 'mapbox-gl';
import {environment} from "./../../environments/environment"

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
  disease: any
  result: any
  t1 = 0
  t2 = 0
  t3 = 0
  p1 = ''
  p2 = ''
  p3 = ''
  temp: any
  len: any
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


      this.disease = this.list[this.list.length - 1].result1.answer1
  

      this.connect.get_data_post().subscribe((data) => {
        this.result = data
      })
      // console.log(this.result)



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


          this.sendMobile(this.tempResult1)
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
      // console.log(this.tempArr)
      // console.log(this.p1, this.p2, this.p3)
      this.lengthId = this.list.length
      this.showResult = true




    })
  }


   async getData(data: object) {
       await this.connect.send_post_request(data).subscribe()
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
    // console.log(data)
    this.printNearby()


    

 
    this.printData()
   


  }



 longitude:any
 latitude:any
response:any
Doctors:any
Hospitals:any
HospitalsName:string[]=[]
HospitalsAddress:string[]=[]
DoctorsName:string[]=[]
DoctorsAddress:string[]=[]





isNearby=false
printNearby(){
  this.isNearby=true
  let d:any
  const data=this.connect.get_user().subscribe(e=>{
 this.response=e
 for(let i=0;i<this.response.length;i++){
 let local_data:any
 local_data=JSON.parse(localStorage.getItem('user')||"{}")
 if(this.response[i].uid===local_data.uid){
  this.save_phoneNumber(this.response[i].mobile)
  console.log(this.response[i].mobile)
   console.log(this.response[i].location.longitude)
   this.latitude=this.response[i].location.latitude
   this.longitude=this.response[i].location.longitude



  mapboxgl.accessToken =environment.MapBox_AccessToken
 const map = new mapboxgl.Map({
   
   container: 'map', // Replace 'map' with the ID of the HTML element where you want to display the map
   style: 'mapbox://styles/mapbox/streets-v11', // Use your desired Mapbox map style
   center: [this.longitude,this.latitude], // Set the initial center of the map based on longitude and latitude
   zoom:13 // Adjust the initial zoom level as needed
 });
 console.log(this.latitude,this.longitude)

 const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${this.longitude},${this.latitude}&access_token=${mapboxgl.accessToken}`;

 fetch(url)
   .then(response => response.json())
   .then(data => {
     const hospitals = data.features.map((feature: any) => {
       return {
         name: feature.text,
         address: feature.place_name,
         coordinates: feature.center
       };
     });

     console.log(hospitals);
     this.printHospital(hospitals)
   })
   .catch(error => {
     console.log('Error:', error);
   });

   const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/doctor.json?proximity=${this.longitude},${this.latitude}&access_token=${mapboxgl.accessToken}`;

 fetch(url2)
   .then(response => response.json())
   .then(data => {
     const doctors = data.features.map((feature: any) => {
       return {
         name: feature.text,
         address: feature.place_name,
         coordinates: feature.center
       };
     });

     console.log(doctors);
     this.printDoc(doctors);
     
   })
   .catch(error => {
     console.log('Error:', error);
   });
 }
}
})

console.log("hellpo",this.Doctors)
}


  ngOnInit(): void {
    // console.log(this.tempArr)'
   

  }





 printDoc(doctors:any) {
  this.Doctors=doctors
  for(let i=0;i<this.Doctors.length;i++){
    this.DoctorsName.push(this.Doctors[i].name)
    this.DoctorsAddress.push(this.Doctors[i].address)
  }
  this.DocAddress=this.DoctorsAddress
  this.DocName=this.DocName
}
printHospital(hospital:any){
  this.Hospitals=hospital
  for(let i=0;i<this.Hospitals.length;i++){
    this.HospitalsName.push(this.Hospitals[i].name)
    this.HospitalsAddress.push(this.Hospitals[i].address)
  }
  this.HName=this.HospitalsName
  this.HAddress=this.HospitalsAddress

}

Mobile:any
save_phoneNumber(data:string)
{
  this.Mobile=data

}
DocName:string[]=[]
DocAddress:string[]=[]
HName:string[]=[]
HAddress:string[]=[]


sendMobile(data:any){
  console.log("----------------",this.DoctorsAddress)
  this.connect.send_sms({
    "disease":data,
    "hospitalName":this.HospitalsName,
    "hospitalAddress":this.HospitalsAddress,
    "doctorName":this.DoctorsName,
    "doctorAddress":this.DoctorsAddress,
    "mobile":this.Mobile

  }).subscribe()
}
}
