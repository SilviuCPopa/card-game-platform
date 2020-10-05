import { Player } from "./player";
import { CARD } from "./card";


export class Move {
    player: Player;
    card: CARD;

    constructor(player: Player, card: CARD) {
        this.player = player;
        this.card = card;
    }

    canMove() {

    }
}