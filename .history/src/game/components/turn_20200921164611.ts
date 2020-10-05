import { Player } from "./player";


export class Turn {
    players: { [key: string]: Player; };
    activePlayer: Player;

    constructor(players: any) {
        this.players = players;
        this.setRandomTurn();
    }

    private getNextPlayer(player: Player) {
        const playerId =  Object.keys(this.players).filter(id => id !== player.getId())[0]
        return this.players[playerId];
    }

    setRandomTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }

    getCurrentPlayerTurn() {
        return this.activePlayer;
    }

    setPlayerTurn(player: Player) {
        this.activePlayer = player;
    }

    end(player: Player) {
        this.activePlayer = this.getNextPlayer(player);
    }
}