import { SET_OPTIONAL_TURN, SET_TURN } from "../properties/game.observables.properties";
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
        this.gameData.update(value);
    }

    setRandomPlayerTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }
}