import { Card } from "./card";

export class Pot {
    private cards: Card[] = [];

    add(card: Card) {
        this.cards.push(card);
    }

    getFirstCard() {
        if (this.cards.length > 0) {
            return this.cards[0];
        }
        return null;
    }

    getPotSize() {
        return this.cards.length;
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
}