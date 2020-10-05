import { Game } from "../src/game/components/game";
import { HumanPlayer } from "../src/game/components/player";
import { GameActionHandler } from "./handlers/game-action.handler";
import { ClientActions } from "./interfaces/game-socket.interface";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    socket: any;
    game: Game;
    gameSockets: { [key: string]: any } = {};
    readyPlayers: { [key: string ]: string} = {};

    private gameActionHandler = new GameActionHandler();

    constructor(server: any) {
        this.socket = socket(server);
        this.game = this.createGame();
        this.game.getGameData().registerObservers(this);
    }

    initialize() {
        this.socket.on('connection', (socket: any) => {
            if (Object.keys(this.gameSockets).length < 2) {
                this.gameSockets[socket.id] = socket;
                this.handleActions(socket.id);
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
        console.log(Object.keys(this.gameSockets));
        this.gameActionHandler.handle(event, this.gameSockets);
    }

    update(event: any) {
        this.handleGameEvents(event);
    }
 
    handleActions(socketId: string) {
        const clientSocket = this.gameSockets[socketId];

        clientSocket.on(ClientActions.PLAYER_READY, () => { 
            this.readyPlayers
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            console.log("start game");
            clientSocket.emit('start', `start now ${clientSocket.id}`);
            this.startGame();
        });

        clientSocket.on(ClientActions.DISCONNECT, () => {
            delete this.gameSockets[clientSocket.id];
        });
    }
}