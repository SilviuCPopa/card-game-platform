import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Card } from "./card";

export class Hand {
    private cards: Card[];
    private limit = MAX_HAND_SIZE;

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    addCards(cards: Card[]) {
        const renewedCards = this.cards.concat(cards);
        if (renewedCards.length <= this.limit) {
            this.cards = this.cards.concat(cards);
        } else {
            throw new Error('Hand limit exceded!');
        }
    }

    playCard(card: Card) {
        this.cards = this.cards.filter(item => item.getName() !== card.getName());
    }

    getHandSize() {
        return this.cards.length;
    } 

    isHandFull() {
        return this.cards.length === this.limit;
    }

    getPlayedCardsAmmount() {
        return this.limit - this.getHandSize();
    }

    isHandEmpty() {
        return this.cards.length === 0;
    }

    setLimit(limit: number) {
        this.limit = limit;
    }
}