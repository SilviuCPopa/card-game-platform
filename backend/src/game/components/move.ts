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

    getPlayer() {
        return this.player;
    }

    getCard() {
        return this.card;
    }

    makeMove() {
        this.setPotWinner();
        this.player.getHand().playCard(this.card);
        this.pot.addCard(this.card);
        this.evaluateMove();
    }

    isFinalMove() {
        return !!this.finalMove;
    }

    private setPotWinner() {
        if (this.pot.isPotEmpty() || this.pot.isWinnerCard(this.card)) {
            this.pot.setPotWinner(this.player);
        }
    }

    private evaluateMove() {
        if (!this.pot.isWinnerCard(this.card) && this.pot.isComplete()) {
            this.finalMove = true;
        }
    }
}