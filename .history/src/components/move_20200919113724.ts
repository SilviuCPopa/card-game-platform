import { Player } from "./player";
import { CARD } from "./card";
import { WINNER_POT_CARD } from "../properties/card.properties";


export class Move {
    player: Player;
    card: CARD;

    private potWinner: boolean = false;

    constructor(player: Player, card: CARD) {
        this.player = player;
        this.card = card;
    }

    move(startCard: CARD) {
        if (this.card.name === startCard.name) {
            this.potWinner = true;
        }
    }

    private isWinnerCard(startCard: CARD) {
        return this.card.name === startCard.name || this.card.name === WINNER_POT_CARD;
    }
}