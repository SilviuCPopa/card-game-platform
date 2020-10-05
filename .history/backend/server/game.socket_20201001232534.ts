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
                this.handleActions(socket.id);
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
 
    handleActions(socket: any) {
        this.gameSockets[socket.id] = socket;

        socket.on(ClientActions.PLAYER_READY, (playerName: string) => { 
            const player = new HumanPlayer(playerName);
            this.readyPlayers[socket.id] = player;
            console.log('ready', this.readyPlayers);
        });

        socket.on(ClientActions.START_GAME, () => { 
            console.log("start game");
            socket.emit('start', `start now ${socket.id}`);
            this.startGame();
        });

        socket.on(ClientActions.DISCONNECT, () => {
            if (this.isSocketDefined(socket.id)) {
                console.log('disconnected', socket.id);
            }
        });
    }

    private isSocketDefined(id: string) {
        return !!this.gameSockets[id];
    }
}