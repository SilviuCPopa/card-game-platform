import { CARD_FORM, INITIAL_CARD_INDEX, LAST_CARD_INDEX } from "../properties/card.properties";
import { CARD } from "./card";

export class CardDeck {
    cards: CARD[];
    deckLength = 32;

    private forms = [
        CARD_FORM.F,
        CARD_FORM.T,
        CARD_FORM.I,
        CARD_FORM.R,
    ];

    constructor(cards: CARD[]) {
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

    draw(amount: number): CARD[] {  
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

    private createCardsWithForm(form: CARD_FORM) {
        let cards: CARD[] = [];
        for(let i = INITIAL_CARD_INDEX; i <= LAST_CARD_INDEX; i++) {
            cards.push(new CARD(i.toString(), form));
        }
    }
} 