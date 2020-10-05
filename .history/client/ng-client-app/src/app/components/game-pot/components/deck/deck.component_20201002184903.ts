import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-pot-deck',
  templateUrl: './deck.component.html',
})
export class GamePotComponent extends CardComponent {

  @Input() cards: any;
}
