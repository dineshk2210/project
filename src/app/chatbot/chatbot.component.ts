import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent  {

  showChat: boolean = false;
  questions: string[] = [];
  newQuestionText: string = '';
  result: string = '';

  showChatBot(): void {
    this.showChat = !this.showChat;
  }

  submitQuestion(): void {
    if (this.newQuestionText) {
      this.questions.push(this.newQuestionText);
      this.getResult(this.newQuestionText); // Function to get the result based on the question
      this.newQuestionText = '';
    }
  }

  getResult(question: string): void {
    // Here, you can implement the logic to get the answer/result based on the question.
    // For simplicity, let's assume a static answer:
    if (question === 'Hi there') {
      this.result = 'Hey , How Can I help you?.';
    } else {
      this.result = 'Sorry, I cannot answer that question.';
    }
  }
}
