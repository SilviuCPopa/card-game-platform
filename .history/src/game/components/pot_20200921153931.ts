import { Card } from "./card";

export class Pot {
    private cards: Card[] = [];
    private points = 

    add(card: Card) {
        this.cards = this.cards.concat(card);
    }

    getPotSize() {
        return this.cards.length;
    }

    getPointsAmmount() {
        
    }
}