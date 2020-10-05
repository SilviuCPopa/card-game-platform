import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";
import { Pot } from "./pot";


export class Move {
    player: Player;
    card: Card;

    private potWinner: boolean = false;

    constructor(player: Player, card: Card) {
        this.player = player;
        this.card = card;
    }

    makeMove(pot?: Pot) {
        if (!pot.isPotEmpty() && this.isWinnerCard(pot)) {
            this.potWinner = true;
        }
    }

    isWinnerMove() {
        return !!this.potWinner;
    }

    private isWinnerCard(pot: Pot) {
        return this.card.getName() === pot.getFirstCard().getName() || this.card.getName() === WINNER_POT_CARD;
    }
}