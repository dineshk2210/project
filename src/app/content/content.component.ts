import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() {
    let data:object
      data=JSON.parse(localStorage.getItem('user')||"{}")
      console.log(data)
   }
  @Input() showSideNav: boolean = false
  ngOnInit(): void {
  }


}
