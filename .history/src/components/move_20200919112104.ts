import { Card } from "./card";
import { Player } from "./player";
import { CARD } from "./card";


export class Move {
    player: Player;
    card: Card;

    constructor(player: Player, card: Card) {
        this.player = player;
        this.card = card;
    }
}