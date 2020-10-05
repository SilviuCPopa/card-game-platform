import { Game } from "../src/game/components/game";
import { GameData } from "../src/game/components/game-data";
import { HumanPlayer } from "../src/game/components/player";

const socket = require("socket.io");

export class GameSocket {

    gameSocket: any;
    game: Game;
    gameData$: Observable<GameData>;

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
        this.game = new Game(player1, player2);
        this.gameData = this.game.getGameData();
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