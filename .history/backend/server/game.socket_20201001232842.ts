import { Game } from "../src/game/components/game";
import { HumanPlayer, Player } from "../src/game/components/player";
import { GameActionHandler } from "./handlers/game-action.handler";
import { ClientActions } from "./interfaces/game-socket.interface";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    socket: any;
    game: Game;
    gameSockets: { [key: string]: any } = {};
    readyPlayers: { [key: string ]: Player} = {};

    private gameActionHandler = new GameActionHandler();

    constructor(server: any) {
        this.socket = socket(server);
    }

    initialize() {
        this.socket.on('connection', (socket: any) => {
            console.log('gameSocket', Object.keys(this.gameSockets));
            if (Object.keys(this.gameSockets).length < 2) {
                this.handleActions(socket);
            }
        });
    }

    private startGame() {
        const players = Object.values(this.readyPlayers);
        console.log('length', players.length);
        if (players.length === 2) {
            this.game = new Game(players[0], players[1]);
            this.game.start();
            this.game.getGameData().registerObservers(this); 
        }
    }

    handleGameEvents(event: any) {
        console.log(Object.keys(this.gameSockets));
        this.gameActionHandler.handle(event, this.gameSockets);
    }

    update(event: any) {
        this.handleGameEvents(event);
    }
 
    handleActions(clientSocket: any) {
        this.gameSockets[socket.id] = socket;

        clientSocket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            this.setPlayerReady(socket.id, playerName);
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            console.log("start game");
            clientSocket.emit('start', `start now ${clientSocket.id}`);
            this.startGame();
        });

        clientSocket.on(ClientActions.DISCONNECT, () => {
            if (this.isSocketDefined(clientSocket.id)) {
                console.log('disconnected', clientSocket.id);
            }
        });
    }

    private setPlayerReady(socketId: string, playerName: string) {
        if (!this.readyPlayers[socketId]) {
            this.readyPlayers[socketId] = new HumanPlayer(playerName);
        }
    }

    private isSocketDefined(id: string) {
        return !!this.gameSockets[id];
    }
}