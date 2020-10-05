import { WINNER_POT_CARD } from "../properties/card.properties";
import { Card } from "./card";
import { Player } from "./player";

export class Pot {
    private cards: Card[] = [];
    private potWinner: Player;
    private challenge = false;

    addCard(card: Card) {
        this.evaluateCard(card);
        this.cards.push(card);
    }

    getFirstCard() {
        if (this.cards.length > 0) {
            return this.cards[0];
        }
        return null;
    }

    reset() {
        this.cards = [];
        this.potWinner = null;
    }

    isComplete() {
        return this.cards.length % 2 === 0;
    }

    isPotEmpty() {
        return this.cards.length === 0;
    }

    isChallenge() {
        return !!this.challenge;
    }

    setPotWinner(player: Player) {
        this.potWinner = player;
    } 

    getPotWinner() {
        return this.potWinner;
    }

    getPointsAmmount() {
        let points = 0;
        this.cards.forEach( card => {
            if (card.isPoint()) {
                points++;
            }
        })
        return points;
    }

    isWinnerCard(card: Card) {
        return card.getName() === this.getFirstCard()?.getName() || card.getName() === WINNER_POT_CARD;
    }

    private evaluateCard(card: Card) {
        this.challenge = false;
        if (this.isWinnerCard(card)) {
            this.challenge = true;
        }
    }
}