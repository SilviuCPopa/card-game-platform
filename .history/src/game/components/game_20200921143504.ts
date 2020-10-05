import { Deck } from "./deck";
import { Player } from "./player";

export class Game {
    players: { [key: string]: Player; } = {};
    deck = new Deck();

    constructor(player1: Player, player2: Player) {
        this.players[player1.getName()] = player1;
        this.players[player2.getName()] = player2;
    }

    start() {
        this.deck.initialise();
        
    }

    private getPlayerByName(name: string) {
        return this.players[name];
    }
}