import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";


export class Move {
    player: Player;
    card: Card;

    private potWinner: boolean = false;

    constructor(player: Player, card: Card) {
        this.player = player;
        this.card = card;
    }

    makeMove(startCard: Card) {
        if (this.isWinnerCard(startCard)) {
            this.potWinner = true;
        }
    }

    isWinnerMove() {
        return this.potWinner;
    }

    private isWinnerCard(startCard: Card) {
        return this.card.getName() === startCard.getName() || this.card.getName() === WINNER_POT_CARD;
    }
}