import { Deck } from "./deck";
import { Hand } from "./hand";
import { Move } from "./move";
import { Player } from "./player";
import { Pot } from "./pot";
import { Turn } from "./turn";


export class Round {
    players: { [key: string]: Player; } = {};
    pot: Pot;
    turn: Turn;
    deck: Deck;

    constructor(players: any, pot: Pot, deck: Deck) {
        this.players = players;
        this.pot = pot;
        this.deck = deck;
        this.turn = new Turn(players);
    }

    nextRound() {
        this.endRound();
        this.nextRound();
    }

    canStartAnotherRound() {
        return !this.deck.isDeckEmpty();
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
        this.turn.setPlayerTurn(this.getOponentPlayer(player));
    }

    handleMove(move: Move) {
        const oponent = this.getOponentPlayer(move.getPlayer());
        const oponentHand = oponent.getHand();
        if (oponentHand.hasCandidateCards(move.getCard())) {
            this.turn.setPlayerTurn(oponent);
            // trigger player alert(continue, give pot to oponent)
        } else {
            this.nextRound();
        }
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

    private getOponentPlayer(player: Player) {
        const playerId =  Object.keys(this.players).filter(id => id !== player.getId())[0]
        return this.players[playerId];
    }
}
