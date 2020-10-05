import { Card_FORM, INITIAL_CARD_INDEX, LAST_CARD_INDEX } from "../properties/card.properties";
import { Card } from "./card";

export class Deck {
    private cards: Card[] = [];

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

    draw(ammount: number): Card[] {  
        if (!this.canDraw(ammount)) {
            const cards = this.cards.slice(0, ammount);            
            this.cards.splice(0, ammount);
            return cards;
        }
        return [];
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

    canDraw(ammount: number) {
        return !this.isDeckEmpty() && this.cards.length >= ammount;
    }

    isDeckEmpty() {
        return this.cards.length === 0;
    }

    getDeckLength() {
        return this.cards.length;
    }

    private createDeck() {  
        for(var i = 0; i <= this.forms.length; i++) {
           this.createCardsWithForm(this.forms[i]); 
        }
    }

    private createCardsWithForm(form: Card_FORM) {
        for(let i = INITIAL_CARD_INDEX; i <= LAST_CARD_INDEX; i++) {
            this.cards.push(new Card(i.toString(), form));
        }
    }
} 