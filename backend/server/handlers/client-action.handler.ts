import { Game } from "../../src/game/components/game";
import { HumanPlayer, Player } from "../../src/game/components/player";
import { ClientActions } from "../interfaces/game-socket.interface";
import { GameActionHandler } from "./game-action.handler";


export class ClientActionHandler {

    sockets: any;
    readyPlayers: { [key: string ]: Player} = {};
    game: Game;

    private gameActionHandler = new GameActionHandler();

    handle(clientId: string) {
        const clientSocket = this.sockets[clientId];

        clientSocket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            this.setPlayerReady(clientId, playerName);
        });

        clientSocket.on(ClientActions.START_GAME, () => { 
            this.startGame();
        });

        clientSocket.on(ClientActions.DISCONNECT, () => {
            if (this.isSocketDefined(clientId)) {
                console.log('disconnected', clientId);
            }
        });
    }

    updateSockets(sockets: any) {
        this.gameActionHandler.updateSockets(sockets);
        this.sockets = sockets;
    }

    private setPlayerReady(clientId: string, playerName: string) {
        if (!this.readyPlayers[clientId]) {
            this.readyPlayers[clientId] = new HumanPlayer(clientId, playerName);
        }
    }

    private isSocketDefined(id: string) {
        return !!this.sockets[id];
    }

    private startGame() {
        if (this.canStartGame()) {
            this.createGame();
            this.game.start();
        }
    } 

    private createGame() {
        const players = Object.values(this.readyPlayers);
        this.game = new Game(players[0], players[1]);
        this.game.registerHandler(this.gameActionHandler); 
    }

    private canStartGame() {
        return Object.values(this.readyPlayers).length === 2 && !this.game?.isStarted();
    }
}