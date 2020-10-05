import { Player } from "./player";
import { Card } from "./card";
import { WINNER_POT_Card } from "../properties/card.properties";


export class Move {
    player: Player;
    card: Card;

    private potWinner: boolean = false;

    constructor(player: Player, card: Card) {
        this.player = player;
        this.card = card;
    }

    move(startCard: Card) {
        if (this.isWinnerCard(startCard)) {
            this.potWinner = true;
        }
    }

    isWinnerMove() {
        return this.potWinner;
    }

    private isWinnerCard(startCard: Card) {
        return this.card.name === startCard.name || this.card.name === WINNER_POT_Card;
    }
}