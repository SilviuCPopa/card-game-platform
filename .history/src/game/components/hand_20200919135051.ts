import { Card } from "./card";

export class Hand {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    playCard(card: Card) {
        this.cards = this.cards.filter(item => item.name !== card.name);
    }

    getHandSize() {
        return this.cards.length;
    }
}