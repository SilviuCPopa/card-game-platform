import { Game } from "../src/game/components/game";
import { HumanPlayer } from "../src/game/components/player";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    gameSocket: any;
    game: Game;
    socket: any;

    constructor(server: any) {
        this.gameSocket = socket(server);
        this.game = this.createGame();
        this.game.getGameData().registerObservers(this);
    }

    initialize() {
        this.gameSocket.on("connection", (socket: any) => {
            this.socket = socket;
            this.startGame();
        });
    }

    private createGame() {
        const player1 = new HumanPlayer('silviu');
        const player2 = new HumanPlayer('geanina');
        return new Game(player1, player2);
    }

    private startGame() {
        this.game.start();
    }

    handleGameEvents(event) {
        this.gameSocket.emi
    }

    update(event: any) {
        this.handleGameEvents(event);
    }
 
    handleActions(socket: any) {
        socket.on('start', () => { 
            socket.emit('game', 'bla');
        });
    }
}