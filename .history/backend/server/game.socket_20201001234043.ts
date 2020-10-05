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
        this.socket.on('connection', (clientSocket: any) => {
            console.log(Object.keys(this.gameSockets).length < 2, this.gameSockets[clientSocket.id]);
            if (Object.keys(this.gameSockets).length < 2 || !!this.gameSockets[clientSocket.id]) {
                this.gameSockets[clientSocket.id] = clientSocket;
                this.handleActions(clientSocket);
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
       

        clientSocket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            this.setPlayerReady(clientSocket.id, playerName);
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
        console.log('ready Players', this.readyPlayers[socketId], socketId);
        if (!this.readyPlayers[socketId]) {
            this.readyPlayers[socketId] = new HumanPlayer(playerName);
        }
    }

    private isSocketDefined(id: string) {
        return !!this.gameSockets[id];
    }
}