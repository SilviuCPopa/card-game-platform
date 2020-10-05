import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent {

  @Input() hand: any;

  getCardImagePath(card: any): string {
    return `/assets/cards/${card.name}${card.form}.png`;
  }
}
