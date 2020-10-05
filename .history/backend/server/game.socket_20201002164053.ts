import { Game } from "../src/game/components/game";
import { ClientActionHandler } from "./handlers/client-action.handler";
import { GameActionHandler } from "./handlers/game-action.handler";
import { ServerAction } from "./interfaces/game-socket.interface";

const socket = require("socket.io");

export class GameSocket {

    socket: any;
    game: Game;
    clientSockets: { [key: string]: any } = {};

    private gameActionHandler = new GameActionHandler();
    private clientActionHandler = new ClientActionHandler();

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
        Object.keys(this.clientSockets).forEach( clientId => {
            this.clientSockets[clientId].removeAllListeners();
            this.gameActionHandler.updateSockets(this.clientSockets);
            this.clientActionHandler.handle(this.clientSockets, clientId);
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

}