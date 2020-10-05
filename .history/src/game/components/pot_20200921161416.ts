import { Card } from "./card";
import { Player } from "./player";

export class Pot {
    private cards: Card[] = [];
    private potWinner: Player;

    add(card: Card) {
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
    }

    isComplete() {
        return this.cards.length % 2 === 0;
    }

    isPotEmpty() {
        return this.cards.length === 0;
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
}