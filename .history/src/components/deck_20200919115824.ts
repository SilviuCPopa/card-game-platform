import { CARD } from "./card";

export class CardDeck {
    cards: CARD[];
    deckLength = 32;

    constructor(cards: CARD[]) {
        this.cards = cards;
    }
    
    suffleDeck() {
        var i = this.cards.length, j, tempi, tempj;
        if (i === 0) return false;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = this.cards[i];
            tempj = this.cards[j];
            this.cards[i] = tempj;
            this.cards[j] = tempi;
        }
    }
}