import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../../common/components/card.component';

@Component({
  selector: 'app-game-pot-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class GamePotDeckComponent extends CardComponent {

  @Input() cards: any = new Array(5);
}
