import { Component, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CardComponent } from '../../common/components/card.component';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})
export class PlayerHandComponent extends CardComponent {

  @Input() hand: any;

  startRoundEvent = this.socket.fromEvent<Document>('START_ROUND');

  constructor(private socket: Socket) {
    super();
  }
}
