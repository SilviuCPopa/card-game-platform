import { Deck } from "./deck";
import { Player } from "./player";
import { Pot } from "./pot";
import { Turn } from "./turn";


export class Round {
    players: { [key: string]: Player; } = {};
    pot: Pot;
    turn: Turn;
    deck: Deck;

    constructor(players: any, pot: Pot, turn: Turn, deck: Deck) {
        this.players = players;
        this.pot = pot;
        this.turn = turn;
        this.deck = deck;
    }

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