import { Game } from "../src/game/components/game";
import { HumanPlayer } from "../src/game/components/player";
import { Observer } from "./interfaces/observer.interface";

const socket = require("socket.io");

export class GameSocket implements Observer {

    gameSocket: any;
    game: Game;

    constructor(server: any) {
        this.gameSocket = socket(server);
        this.game = this.createGame();
        this.game.getGameData().registerObservers(this);
    }

    initialize() {
        this.gameSocket.on("connection", (socket: any) => {
            this.startGame();
            this.getGameInstructions();
            this.handleActions(socket);
        });
    }

    private createGame() {
        const player1 = new HumanPlayer('silviu');
        const player2 = new HumanPlayer('geanina');
        return new Game(player1, player2);
    }

    private startGame() {
        this.game.start();
    }

    getGameInstructions() {
        
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