import { Subject } from "rxjs/internal/Subject";
import { SET_REQUIRED_TURN, SET_TURN } from "../properties/game.observables.properties";
import { GameData } from "./game-data";
import { Player } from "./player";


export class Turn {
    players: { [key: string]: Player; };
    activePlayer: Player;
    gameData: GameData;

    constructor(gameData: GameData, players: any) {
        this.players = players;
        this.gameData = gameData;
        this.setRandomPlayerTurn();
    }    

    getCurrentPlayerTurn() {
        return this.activePlayer;
    }

    setPlayerTurn(player: Player) {
        this.activePlayer = player;
        this.gameData.update({
            key: SET_TURN,
            value: player
        });
    }

    setRequiredPlayerTurn(player: Player) {
        this.activePlayer = player;
        this.gameData.update({
            key: SET_REQUIRED_TURN,
            value: player
        });
    }

    setRandomPlayerTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }
}