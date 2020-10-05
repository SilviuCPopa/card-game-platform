import { Card_FORM, INITIAL_Card_INDEX, LAST_Card_INDEX } from "../properties/card.properties";
import { Card } from "./card";

export class Deck {
    cards: Card[] = [];
    deckLength = 32;

    private forms = [
        Card_FORM.F,
        Card_FORM.T,
        Card_FORM.I,
        Card_FORM.R,
    ];
    
    initialise() {
        this.createDeck();
        this.suffleDeck();
    } 

    draw(amount: number): Card[] {  
        const cards = this.cards.slice(0, amount);
        this.cards.splice(0, amount);
        return cards;
    }

    suffleDeck() {
        var i = this.cards.length, j, tempi, tempj;
        if (i === 0) return;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = this.cards[i];
            tempj = this.cards[j];
            this.cards[i] = tempj;
            this.cards[j] = tempi;
        }
    }

    getAllCards() {
        return this.cards;
    }

    private createDeck() {  
        for(var i = 0; i <= this.forms.length; i++) {
           this.createCardsWithForm(this.forms[i]); 
        }
    }

    private createCardsWithForm(form: Card_FORM) {
        let cards: Card[] = [];
        for(let i = INITIAL_Card_INDEX; i <= LAST_Card_INDEX; i++) {
            cards.push(new Card(i.toString(), form));
        }
    }
} 