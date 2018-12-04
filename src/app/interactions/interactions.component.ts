import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { InteractionsService } from './interactions.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: [
    './interactions.component.css',
    '../../../node_modules/material-icons/iconfont/material-icons.css'
  ]
})
export class InteractionsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chats: any[] = [];
  chatForm: FormGroup;
  joinned: boolean;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  users: any[] = [];
  socket: any;
  date: Date;

  constructor(private chat: InteractionsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.date = new Date();
    this.joinned = false;
    this.chatForm = this.fb.group({
      message: ['', []],
      nickname: ['', []],
      room: ['', []]
    });
    this.socket = this.chat.socket;
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.chats.push(JSON.parse(msg.text));
    });
    this.users.push(JSON.parse(localStorage.getItem('user')));
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' };
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on(
      'new-message',
      function(data) {
        if (
          data.message.room === JSON.parse(localStorage.getItem('user')).room
        ) {
          this.chats.push(data.message);
          this.msgData = {
            room: user.room,
            nickname: user.nickname,
            message: ''
          };
          this.scrollToBottom();
        }
      }.bind(this)
    );
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getChatByRoom(room) {
    this.chat.getChatByRoom(room).then(
      res => {
        this.chats.push(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  joinRoom() {
    const date = new Date();
    this.joinned = true;
    localStorage.setItem('user', JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = {
      room: this.newUser.room,
      nickname: this.newUser.nickname,
      message: ''
    };

    this.socket.emit('save-message', {
      room: this.newUser.room,
      nickname: this.newUser.nickname,
      message: 'Join this room',
      updated_at: date
    });
  }

  sendMessage() {
    this.chat.sendMsg(this.msgData);
    this.date = new Date();
  }
  sendMessages() {
    this.chat.sendMsg(this.chatForm.controls['message'].value);
  }
  logout() {
    this.joinned = false;
    const date = new Date();
    const user = JSON.parse(localStorage.getItem('user'));
    this.socket.emit('save-message', {
      room: user.room,
      nickname: user.nickname,
      message: 'Left this room',
      updated_at: date
    });
    localStorage.removeItem('user');
  }
}
