import { Subject } from "rxjs/internal/Subject";
import { SET_TURN } from "../properties/game.observables.properties";
import { Player } from "./player";


export class Turn {
    players: { [key: string]: Player; };
    activePlayer: Player;
    turnSubject = new Subject();

    constructor(players: any) {
        this.players = players;
        this.setRandomPlayerTurn();
    }    

    getCurrentPlayerTurn() {
        return this.activePlayer;
    }

    setPlayerTurn(player: Player) {
        this.activePlayer = player;
        this.turnSubject.next({
            key: SET_TURN,
            value: player
        });
    }

    setRandomPlayerTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }
}