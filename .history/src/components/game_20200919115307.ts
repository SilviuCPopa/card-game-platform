import { CardPack } from "./pack";
import { Player } from "./player";

export class Game {
    players: { [key: string]: Player; } = {};
    pack = new CardPack([]);

    constructor(player1: Player, player2: Player) {
        this.players[player1.name] = player1;
        this.players[player2.name] = player2;
    }
}