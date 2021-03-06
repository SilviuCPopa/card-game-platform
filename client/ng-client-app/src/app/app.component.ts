import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  connectedEvent = this.socket.fromEvent<Document>('CONNECTED');

  cards: any = [];

  player: any;
  opponent: any;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.connectedEvent.subscribe( (playerId: any) => {
      console.log('playerId', playerId);
      localStorage.setItem('playerId', playerId);
    });

    this.socket.emit('PLAYER_READY', 'silviu');
    this.socket.emit('START_GAME');
  }

  getPlayerHand(): any {
    return this.player?.hand;
  }
}
