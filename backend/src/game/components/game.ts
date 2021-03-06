import { Card } from "./card";
import { Deck } from "./deck";
import { GameData } from "./game-data";
import { Move } from "./move";
import { Player } from "./player";
import { Pot } from "./pot";
import { Round } from "./round";

export class Game {
    private players: { [key: string]: Player; } = {};
    private deck = new Deck();
    private pot = new Pot();
    private round: Round;
    private winner: Player;
    private gameData: GameData;
    private gameStarted = false;

    constructor(player1: Player, player2: Player) {
        this.players[player1.getId()] = player1;
        this.players[player2.getId()] = player2;
        this.gameData = new GameData(); 
    }

    start() {
        this.deck.initialise();
        this.startRound();
        this.gameStarted = true;
    }

    move(player: Player, card: Card) {
        const move = new Move(this.pot, player, card);
        move.makeMove()
        if (move.isFinalMove() && !this.round.canStartAnotherRound()) {
            this.winner = this.getHigherPlayerScore();
        } else {
            this.round.handleMove(move);
        }
    }

    registerHandler(handler: any) {
        this.getGameData().registerObservers(handler);
    }

    getPlayerById(id: string) {
        return this.players[id];
    }

    getWinner() {
        return this.winner;
    }

    getGameData() {
        return this.gameData;
    }

    isStarted() {
        return !!this.gameStarted;
    }

    private startRound() {
        this.round = new Round(this.gameData, this.players, this.pot, this.deck);
        this.round.startRound(); 
    }

    private getHigherPlayerScore() {
        const player1 = Object.values(this.players)[0];
        const player2 = Object.values(this.players)[1];
        if (player1.getScore() > player2.getScore()) {
            return player1;
        }
        return player2;
    }
} 