import { Player } from "./player";
import { Pot } from "./pot";
import { Turn } from "./turn";


export class Round {
    players: Player[];
    pot: Pot;
    turn: Turn;

    startRound() {
        this.pot.reset();
        this.refillPlayersHand();
    }

    endRound() {
        const potWinnerPlayer = this.pot.getPotWinner();
        potWinnerPlayer.addPoints(this.pot.getPointsAmmount());
        this.turn.setPlayerTurn(potWinnerPlayer);
    }

    private refillPlayersHand() {

    }
}