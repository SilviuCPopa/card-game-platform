import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { CardComponent } from '../../common/components/card.component';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})
export class PlayerHandComponent extends CardComponent implements OnInit {

  @Input()
  type: 'player' | 'opponent';

  hand$: Observable<any> = of(new Array(4));
  startRoundEvent: any;

  constructor(private socket: Socket) {
    super();
  }

  ngOnInit() {
    if (this.isPlayer()) {
      this.hand$ = this.socket.fromEvent<Document>('START_ROUND');
    }
  }

  isPlayer() {
    return this.type === 'player';
  }
}