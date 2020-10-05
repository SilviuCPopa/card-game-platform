import { ClientActionHandler } from "./handlers/client-action.handler";
import { ServerAction } from "./interfaces/game-socket.interface";

const socket = require("socket.io");

export class GameSocket {

    socket: any;
    clientSockets: { [key: string]: any } = {};
    private clientActionHandler = new ClientActionHandler;

    constructor(server: any) {
        this.socket = socket(server);
    }

    initialize() {
        this.socket.on('connection', (clientSocket: any) => {
            this.registerSocket(clientSocket);
            this.handleClientActions();
        });
    }

    handleClientActions() {
        Object.keys(this.clientSockets).forEach( clientId => {
            this.refreshClientSockets(clientId);
            this.clientActionHandler.handle(clientId);
        });
    }

    private refreshClientSockets(clientId: string) {
        this.clientSockets[clientId].removeAllListeners();
        this.clientActionHandler.updateSockets(this.clientSockets);
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