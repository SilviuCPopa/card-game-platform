import { Game } from "../src/game/components/game";
import { HumanPlayer } from "../src/game/components/player";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    socket: any;
    game: Game;
    gameSocket: any;

    constructor(server: any) {
        this.socket = socket(server);
        this.game = this.createGame();
        this.game.getGameData().registerObservers(this);
    }

    initialize() {
        this.socket.on("connection", (socket: any) => {
            console.log(socket);
            this.gameSocket = socket;
            this.startGame();
            this.handleActions();
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

    handleGameEvents(event: any) {
        this.gameSocket.emit(event.key, event.value);
    }

    update(event: any) {
        this.handleGameEvents(event);
    }
 
    handleActions() {
        // handla client actions

        // this.socket.on('start', () => { 
        //     socket.emit('game', 'bla');
        // });
    }
}