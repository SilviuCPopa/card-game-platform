import { Component, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-haand.component.html',
})
export class PlayerHandComponent{

  @Input() hand: any;

  constructor(private socket: Socket) {}

  getCardImagePath(card: any): string {
    return `/assets/cards/${card.name}${card.form}.png`;
  }
}
