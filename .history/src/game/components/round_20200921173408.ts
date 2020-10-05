import { Deck } from "./deck";
import { Hand } from "./hand";
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

    nextRound() {
        this.endRound();
        this.nextRound();
    }

    startRound() {
        this.turn.getCurrentPlayerTurn();
        this.pot.reset();
        this.refillPlayersHand();
    }

    endRound() {
        const potWinnerPlayer = this.pot.getPotWinner();
        potWinnerPlayer.addPoints(this.pot.getPointsAmmount());
        this.turn.setPlayerTurn(potWinnerPlayer);
    }

    nextTurn(player: Player) {
        this.turn.end(player);
    }

    private refillPlayersHand() {
        Object.values(this.players).forEach(player => {
            const drawAmount = this.getEvenlyCardAmmount(player.getHand());
            const cards = this.deck.draw(drawAmount);
            player.getHand().addCards(cards);
        });
    }

    private getEvenlyCardAmmount(playerHand: Hand) {
        const requiredCards = playerHand.getPlayedCardsAmmount();
        const deckLength = this.deck.getDeckLength();
        if (deckLength > 0 && (requiredCards * 2) > deckLength) {
            return deckLength / 2;
        }
        return requiredCards;
    }
}
