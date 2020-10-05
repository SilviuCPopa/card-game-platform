import { Card } from "./card";
import { Deck } from "./deck";
import { Move } from "./move";
import { Player } from "./player";
import { Pot } from "./pot";
import { Round } from "./round";
import { Turn } from "./turn";

export class Game {
    private players: { [key: string]: Player; } = {};
    private deck = new Deck();
    private turn: Turn;
    private pot = new Pot();
    private round: Round;
    private winner: Player;

    constructor(player1: Player, player2: Player) {
        this.players[player1.getId()] = player1;
        this.players[player2.getId()] = player2;
        this.turn = new Turn(this.players);
        this.round = new Round(this.players, this.pot, this.turn, this.deck);
    }

    start() {
        this.deck.initialise();
        this.round.startRound();
    }

    getPlayerById(id: string) {
        return this.players[id];
    }

    getTurn() {
        return this.turn;
    }

    move(player: Player, card: Card) {
        if (this.isCurrentPlayerMove(player)) {
            const move = new Move(this.pot, player, card);
            move.makeMove()
            
        }
    }

    isMoveRequired() {
        return !this.pot.isComplete();
    }

    giveUpPot(player: Player) {
        this.round.endRound();
    }

    private isCurrentPlayerMove(player: Player) {
        return player.getId() === this.turn.getCurrentPlayerTurn().getId();
    }
} 