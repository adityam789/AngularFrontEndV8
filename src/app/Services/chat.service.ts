import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { ChatMessage } from "../chatroom/chatroom.component";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit("text message", msg);
  }

  public getMessages = new Observable<ChatMessage>((observer) => {
    this.socket.on("text message", (message: any) => {
      observer.next(message);
    });
  });

  public getAuth = new Observable<string>((observer) => {
    this.socket.on("Auth", (message: any) => {
      observer.next(message);
    });
  });

  public joinRoom(room, token) {
    this.socket.emit("jwt", token)
    this.socket.emit('room', room)
  }
}
