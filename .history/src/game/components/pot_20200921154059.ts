import { Card } from "./card";

export class Pot {
    private cards: Card[] = [];

    add(card: Card) {
        this.cards = this.cards.concat(card);
    }

    getPotSize() {
        return this.cards.length;
    }

    getPointsAmmount() {
        let points = 0;
        for (let card of this.cards) {
            if (card.isPoint()) {
                points ++;
            }
        }
        return points;
    }
}