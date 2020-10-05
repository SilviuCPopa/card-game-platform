import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Deck } from "./deck";
import { Hand } from "./hand";
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
        Object.keys(this.players).forEach( playerName => {
            this.iniPlayerHand(this.getPlayerByName(playerName));
        });
    }

    private iniPlayerHand(player: Player) {
        const cards = this.deck.draw(MAX_HAND_SIZE);
        player.setHand(new Hand(cards));
    }

    private getPlayerByName(name: string) {
        return this.players[name];
    }
} 