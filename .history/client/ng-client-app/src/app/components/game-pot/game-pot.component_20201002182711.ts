import { Component, Input } from '@angular/core';
import { CardComponent } from '../../common/components/card.component';

@Component({
  selector: 'app-pot',
  templateUrl: './game-pot.component.html',
  styleUrls: ['./game-pot.component.css']
})
export class GamePotComponent extends CardComponent {

  @Input() cards: any;
}
