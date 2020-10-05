import { Game } from "../src/game/components/game";
import { HumanPlayer, Player } from "../src/game/components/player";
import { GameActionHandler } from "./handlers/game-action.handler";
import { ClientActions, ServerAction } from "./interfaces/game-socket.interface";

const socket = require("socket.io");

export class GameSocket {

    socket: any;
    game: Game;
    clientSockets: { [key: string]: any } = {};
    readyPlayers: { [key: string ]: Player} = {};
    private gameActionHandler = new GameActionHandler();

    constructor(server: any) {
        this.socket = socket(server);
    }

    initialize() {
        this.socket.on('connection', (clientSocket: any) => {
            this.registerSocket(clientSocket);
            this.handleActions();
        });
    }

    handleActions() {
        console.log(Object.keys(this.clientSockets));
        Object.keys(this.clientSockets).forEach( clientId => {
            this.clientSockets[clientId].removeAllListeners();
            this.gameActionHandler.setSockets(this.clientSockets);
            this.createListeners(clientId);
        });
    }

    private registerSocket(clientSocket: any) {
        const clientId = clientSocket.handshake.query.playerId;
        if (Object.keys(this.clientSockets).length < 2) {
            this.addNewSocket(clientSocket, clientId);
        } else {
            this.clientSockets[clientId] = clientSocket;
        }        
    }

    private addNewSocket(clientSocket: any, clientId: string) {
        this.clientSockets[clientId] = clientSocket;
        clientSocket.emit(ServerAction.CONNECTED, clientId);
    }

    private canStartGame() {
        return Object.values(this.readyPlayers).length === 2 && !this.game?.isStarted();
    }

    private startGame() {
        if (this.canStartGame()) {
            const players = Object.values(this.readyPlayers);
            this.game = new Game(players[0], players[1]);
            this.game.registerHandler(this.gameActionHandler); 
            this.game.start();
        }
    }

    private createListeners(clientId: string) {
        console.log(Object.keys(this.clientSockets));
        const clientSocket = this.clientSockets[clientId];

        clientSocket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            this.setPlayerReady(clientId, playerName);
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            console.log("start game");
            clientSocket.emit('start', `start now ${clientId}`);
            this.startGame();
        });

        clientSocket.on(ClientActions.DISCONNECT, () => {
            if (this.isSocketDefined(clientId)) {
                console.log('disconnected', clientId);
            }
        });
    }

    private setPlayerReady(clientId: string, playerName: string) {
        if (!this.readyPlayers[clientId]) {
            this.readyPlayers[clientId] = new HumanPlayer(clientId, playerName);
        }
    }

    private isSocketDefined(id: string) {
        return !!this.clientSockets[id];
    }
}