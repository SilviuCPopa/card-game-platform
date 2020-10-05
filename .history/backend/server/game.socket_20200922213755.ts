import { Game } from "../src/game/components/game";
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
            this.handleActions(socket);
        });
    }

    createGame() {
        const player1 = new HumanPlayer('silviu');
        const player2 = new HumanPlayer('geanina');
        return new Game(player1, player2);
    }

    startGame() {
        this.game.start();
    }

    handleActions(socket: any) {
        socket.on('start', () => {
            console.log('start');
            socket.emit('game', 'bla');
        });
    }
}