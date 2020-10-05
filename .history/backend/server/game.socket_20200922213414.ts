const socket = require("socket.io");

export class GameSocket {

    gameSocket: any;

    constructor(server: any) {
        this.gameSocket = socket(server);
    }
}