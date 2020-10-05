import { MAX_HAND_SIZE } from "../properties/card.properties";
import { Card } from "./card";

export class Hand {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    addCards(cards: Card[]) {
        this.cards = this.cards.concat(cards);
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
}