import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  startRoundEvent = this.socket.fromEvent<Document>('START_ROUND');

  cards: any = [];

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.startRoundEvent.subscribe( (data: any) => {
      this.cards = Object.values(data.players)[0]['hand']['cards'];
    });

    this.socket.emit('start');
  }
}
