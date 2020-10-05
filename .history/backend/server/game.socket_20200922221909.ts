import { Game } from "../src/game/components/game";
import { GameData } from "../src/game/components/game-data";
import { HumanPlayer } from "../src/game/components/player";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    gameSocket: any;
    game: Game;

    constructor(server: any) {
        this.gameSocket = socket(server);
    }

    initialize() {
        this.gameSocket.on("connection", (socket: any) => {
            this.createGame();
            this.startGame();
            this.getGameInstructions();
            this.handleActions(socket);
        });
    }

    createGame() {
        const player1 = new HumanPlayer('silviu');
        const player2 = new HumanPlayer('geanina');
        this.game = new Game(player1, player2);
    }

    startGame() {
        this.game.start();
    }

    getGameInstructions() {
        this.game.getGameData().registerObservers(this);
        // this.game.getGameData();
        // this.game.getGameData().subscribe( data => {
        //     console.log('subscribed');
        //     console.log(data);
        // });
    }

    update(action: any) {
        console.log(action);
    }

    handleActions(socket: any) {
        socket.on('start', () => { 
            socket.emit('game', 'bla');
        });
    }
}