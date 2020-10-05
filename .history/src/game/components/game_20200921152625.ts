import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Card } from "./card";
import { Deck } from "./deck";
import { Hand } from "./hand";
import { Move } from "./move";
import { Player } from "./player";
import { Turn } from "./turn";

export class Game {
    private deck = new Deck();
    private players: { [key: string]: Player; } = {};
    private turn: Turn;

    constructor(player1: Player, player2: Player) {
        this.players[player1.getId()] = player1;
        this.players[player2.getId()] = player2;
        this.turn = new Turn(this.players);
    }

    start() {
        this.deck.initialise();
        this.iniPlayersHand();
        this.turn.setRandomTurn();
    }

    getPlayerById(id: string) {
        return this.players[id];
    }

    getTurn() {
        return this.turn;
    }

    move(card: Card) {
        const move = new Move(
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
} 