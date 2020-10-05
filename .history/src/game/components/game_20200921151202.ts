import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Deck } from "./deck";
import { Hand } from "./hand";
import { Player } from "./player";

export class Game {
    players: { [key: string]: Player; } = {};
    deck = new Deck();
    private playerTurn: Player;

    constructor(player1: Player, player2: Player) {
        this.players[player1.getId()] = player1;
        this.players[player2.getId()] = player2;
    }

    start() {
        this.deck.initialise();
        this.iniPlayersHand();
        this.setPlayerTurn();
    }

    private iniPlayersHand() {
        Object.values(this.players).forEach( player => {
            const cards = this.deck.draw(MAX_HAND_SIZE);
            player.setHand(new Hand(cards));
        });
    }

    private setPlayerTurn() {
        this.playerTurn = Object.values(this.players)[0];
    }

    private getPlayerById(id: string) {
        return this.players[id];
    }
} 