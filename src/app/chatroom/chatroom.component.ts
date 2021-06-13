import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { ChatService } from '../Services/chat.service';

export interface ChatMessage{
  "name": string,
  "message": string
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  chatLog: ChatMessage[] = []; 
  // newMessage: string;
  message: string;

  checkoutForm = this.fb.group({
    message: ''
  });

  constructor(private socket: Socket, private route: ActivatedRoute, private chatService: ChatService, public fb: FormBuilder) { 
    this.route.params.subscribe((params: Params) => {
      this.chatService.joinRoom(params.id, localStorage.getItem('Authorization'))
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.chatLog.push({
      "name":"me",
      "message":this.message
    });
  }
  ngOnInit() {
    this.chatService.getMessages.subscribe((message: ChatMessage) => {
        this.chatLog.push(message);
        console.log(message)
      });
    this.chatService.getAuth.subscribe(elem => console.log(elem))
  }

}
