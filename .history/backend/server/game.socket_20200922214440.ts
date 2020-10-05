import { Observable } from "rxjs";
import { Game } from "../src/game/components/game";
import { GameData } from "../src/game/components/game-data";
import { HumanPlayer } from "../src/game/components/player";

const socket = require("socket.io");

export class GameSocket {

    gameSocket: any;
    game: Game;

    constructor(server: any) {
        this.gameSocket = socket(server);
    }

    initialize() {
        this.gameSocket.on("connection", (socket: any) => {
            this.createGame();
            this.startGame();
            this.getGameInstructions();
            this.handleActions(socket);
        });
    }

    createGame() {
        const player1 = new HumanPlayer('silviu');
        const player2 = new HumanPlayer('geanina');
        this.game = new Game(player1, player2);
    }

    startGame() {
        this.game.start();
        console.log('game start');
    }

    getGameInstructions() {
        console.log('here');
        this.game.getGameData().subscribe( data => {
            console.log('subscribed');
            console.log(data);
        });
    }

    handleActions(socket: any) {
        socket.on('start', () => {
            socket.emit('game', 'bla');
        });
    }
}