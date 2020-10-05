import { Player } from "./player";


export class Turn {
    players: Player[];
    activePlayer: Player;

    constructor(players: Player[]) {
        this.players = players;
        this.setRandomTurn();
    }

    private setRandomTurn() {
        const index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    }

    private getNextPlayer(player: Player) {
        return this.players.filter(item => item.getId !== player.getId)[0];
    }

    getCurrentPlayerTurn() {
        return this.activePlayer;
    }

    end(player: Player) {
        this.activePlayer = this.getNextPlayer(player);
    }
}