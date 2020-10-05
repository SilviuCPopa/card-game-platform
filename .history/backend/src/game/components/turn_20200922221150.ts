import { SET_OPTIONAL_TURN, SET_TURN } from "../properties/game.observables.properties";
import { GameData } from "./game-data";
import { Player } from "./player";


export class Turn {
    players: { [key: string]: Player; };
    activePlayer: Player;

    constructor(public gameData: GameData, players: any) {
        this.players = players;
        this.setRandomPlayerTurn();
    }    

    getCurrentPlayerTurn() {
        return this.activePlayer;
    }

    setPlayerTurn(player: Player) {
        this.activePlayer = player;
        this.updateGameData({
            key: SET_TURN,
            value: player
        });
    }

    setOptionalPlayerTurn(player: Player) {
        this.activePlayer = player;
        this.updateGameData({
            key: SET_OPTIONAL_TURN,
            value: player
        });
    }

    updateGameData(value: any) {
        this.gameData.setAction(value);
    }

    setRandomPlayerTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }
}