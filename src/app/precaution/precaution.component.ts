import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../shared/connectivity.service';

@Component({
  selector: 'app-precaution',
  templateUrl: './precaution.component.html',
  styleUrls: ['./precaution.component.css']
})
export class PrecautionComponent implements OnInit {
  names = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
    'Peptic ulcer disease', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
    'Migraine', 'Cervical spondylosis',
    'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
    'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis',
    'Common Cold', 'neumonia', 'Dimorphic hemmorhoids(piles)',
    'Heartattack', 'Varicoseveins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis',
    'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
    'Impetigo']

  precaution = [

  ]
  constructor(private connect: ConnectivityService) { }
  SelectedDisease = 'Fungal infection'
  ngOnInit(): void {
  }

  temp: any

  result: any
  async getResult(data: object) {
    this.temp = data
    this.connect.get_data_post().subscribe(data => {
      this.result = data
    })
    console.log(this.temp.select)

  }

}
