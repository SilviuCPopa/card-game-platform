import { Card_FORM, INITIAL_Card_INDEX, LAST_Card_INDEX } from "../properties/card.properties";
import { Card } from "./card";

export class CardDeck {
    cards: Card[];
    deckLength = 32;

    private forms = [
        Card_FORM.F,
        Card_FORM.T,
        Card_FORM.I,
        Card_FORM.R,
    ];

    constructor(cards: Card[]) {
        this.cards = cards;
    }
    
    initialise() {
        this.createDeck();
        this.suffleDeck();
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

    draw(amount: number): Card[] {  
        const cards = this.cards.slice(0, amount);
        this.cards.splice(0, amount);
        return cards;
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