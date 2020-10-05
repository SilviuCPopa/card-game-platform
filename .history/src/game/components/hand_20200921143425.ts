import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Card } from "./card";

export class Hand {
    private cards: Card[];
    private limit = 4;

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
        this.cards = this.cards.filter(item => item.name !== card.name);
    }

    getHandSize() {
        return this.cards.length;
    }

    isHandFull() {
        return this.cards.length === MAX_HAND_SIZE;
    }

    isHandEmpty() {
        return this.cards.length === 0;
    }

    setLimit(limit: number) {
        this.limit = limit;
    }
}