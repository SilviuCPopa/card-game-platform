import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../common/components/card.component';
import { PlayerHand } from '../../interfaces/player-hand.interface';
import { ClientAction } from '../../interfaces/client-actions.interface';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})
export class PlayerHandComponent extends CardComponent implements OnInit {

  @Input()
  type: 'player' | 'opponent';

  hand$: Observable<PlayerHand>;
  defaultCards = new Array(4);
  startRoundEvent: any;

  constructor(private socket: Socket) {
    super();
  }

  ngOnInit(): void {
    if (this.isPlayer()) {
      this.hand$ = this.socket.fromEvent<Document>('START_ROUND').pipe(
        map( (item: any) => item.hand)
      );
    }
  }

  isPlayer(): boolean {
    return this.type === 'player';
  }

  playCard(card: PlayerHand): void {
    this.socket.emit(ClientAction.PLAY_CARD, card);
  }
}
