import { Game } from "../src/game/components/game";
import { HumanPlayer, Player } from "../src/game/components/player";
import { GameActionHandler } from "./handlers/game-action.handler";
import { ClientActions, ServerAction } from "./interfaces/game-socket.interface";

const socket = require("socket.io");

export class GameSocket {

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
            const playerId = clientSocket.handshake.query.playerId;
            if (Object.keys(this.gameSockets).length < 2) {
                this.addNewSocket(clientSocket, playerId);
            } else if (this.isSocketDefined(playerId)) {
                this.gameSockets[playerId] = clientSocket;
            }
            this.handleActions();
        });
    }

    handleActions() {
        Object.keys(this.gameSockets).forEach( socketId => {
            this.gameSockets[socketId].removeAllListeners();
            this.createListeners(socketId);
        });
    }

    private addNewSocket(clientSocket: any, playerId: string) {
        this.gameSockets[playerId] = clientSocket;
        clientSocket.emit(ServerAction.CONNECTED, playerId);
    }

    private canStartGame() {
        return Object.values(this.readyPlayers).length === 2 && !this.game?.isStarted();
    }

    private startGame() {
        if (this.canStartGame()) {
            const players = Object.values(this.readyPlayers);
            this.game = new Game(players[0], players[1]);
            this.game.getGameData().registerObservers(this.gameActionHandler); 
            this.game.start();
        }
    }

    private createListeners(socketId: string) {
        const clientSocket = this.gameSockets[socketId];

        clientSocket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            this.setPlayerReady(socketId, playerName);
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            console.log("start game");
            clientSocket.emit('start', `start now ${socketId}`);
            this.startGame();
        });

        clientSocket.on(ClientActions.DISCONNECT, () => {
            if (this.isSocketDefined(socketId)) {
                console.log('disconnected', socketId);
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