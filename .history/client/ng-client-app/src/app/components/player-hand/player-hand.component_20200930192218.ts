import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-haand.component.html',
})
export class AppComponent {
  startRoundEvent = this.socket.fromEvent<Document>('START_ROUND');

  cards: any = [];

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.startRoundEvent.subscribe( (data: any) => {
      this.cards = Object.values(data.players)[0]['hand']['cards'];
    });

    this.socket.emit('start');
  }

  getCardImagePath(card: any): string {
    return `/assets/cards/${card.name}${card.form}.png`;
  }
}
