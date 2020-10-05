import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";
import { Pot } from "./pot";


export class Move {
    private player: Player;
    private pot: Pot;
    private card: Card;
    private finalMove = false;

    constructor(pot: Pot, player: Player, card: Card) {
        this.player = player;
        this.card = card;
        this.pot = pot;
    }

    makeMove() {
        if (this.pot.isPotEmpty() || this.isWinnerCard()) {
            this.pot.setPotWinner(this.player);
        }
        this.player.getHand().playCard(this.card);
        this.pot.addCard(this.card);
        this.evaluateMove();
    }

    isFinalMove() {
        return !!this.finalMove;
    }

    private evaluateMove() {
        if (!this.isWinnerCard() && this.pot.isComplete()) {
            this.finalMove = true;
        }
    }

    private isWinnerCard() {
        return this.card.getName() === this.pot.getFirstCard()?.getName() || this.card.getName() === WINNER_POT_CARD;
    }
}