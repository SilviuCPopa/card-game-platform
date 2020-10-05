import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  startRoundEvent = this.socket.fromEvent<Document>('START_ROUND');
  testStartEvent = this.socket.fromEvent<Document>('start');

  cards: any = [];

  player: any;
  opponent: any;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.startRoundEvent.subscribe( (data: any) => {
      this.player = Object.values(data.players)[0];
    });

    this.testStartEvent.subscribe( (data: any) => {
      console.log(data);
    });
    this.socket.emit('PLAYER_READY');
    this.socket.emit('START_GAME');
  }

  getPlayerHand(): any {
    return this.player?.hand;
  }
}
