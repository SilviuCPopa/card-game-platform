import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";
import { Pot } from "./pot";


export class Move {
    player: Player;
    card: Card;
    pot: Pot;

    constructor(pot: Pot, player: Player, card: Card) {
        this.player = player;
        this.card = card;
        this.pot = pot;
    }

    makeMove() {
        if (this.pot.isPotEmpty() || this.isWinnerCard()) {
            this.pot.setPotWinner(this.player);
        }
        this.pot.addCard(this.card);
    }

    private isWinnerCard() {
        return this.card.getName() === this.pot.getFirstCard()?.getName() || this.card.getName() === WINNER_POT_CARD;
    }
}