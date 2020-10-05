import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";
import { Pot } from "./pot";


export class Move {
    player: Player;
    card: Card;
    pot: Pot;

    constructor(player: Player, pot: Pot, card: Card) {
        this.player = player;
        this.card = card;
        this.pot = pot;
    }

    makeMove() {
        if (!this.pot.isPotEmpty() && this.isWinnerCard()) {
            this.pot.add(this.card);
            this.pot.setPotWinner(this.player);
        }
    }

    private isWinnerCard() {
        return this.card.getName() === this.pot.getFirstCard().getName() || this.card.getName() === WINNER_POT_CARD;
    }
}