import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  showChat: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showChatBot() {
    this.showChat = !this.showChat;
    console.log("click")
  }

}
