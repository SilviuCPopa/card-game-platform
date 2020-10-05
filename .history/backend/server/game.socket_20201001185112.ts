import { Game } from "../src/game/components/game";
import { HumanPlayer } from "../src/game/components/player";
import { ClientActions } from "./interfaces/game-socket.interface";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    socket: any;
    game: Game;
    gameSockets: { [key: string]: any} = [];

    constructor(server: any) {
        this.socket = socket(server);
        this.game = this.createGame();
        this.game.getGameData().registerObservers(this);
    }

    initialize() {
        this.socket.on("connection", (socket: any) => {
            console.log(this.gameSockets.length);
            if (this.gameSockets.length < 2) {
                this.gameSockets[socket.id] = socket;
                this.handleActions(socket);
            }
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
        // this.gameSockets.emit(event.key, event.value);
    }

    update(event: any) {
        this.handleGameEvents(event);
    }
 
    handleActions(clientSocket: any) {

        clientSocket.on(ClientActions.PLAYER_READY, () => { 
            clientSocket.emit('game', 'bla');
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            clientSocket.emit('start', `start now ${clientSocket.id}`);
        });
    }
}