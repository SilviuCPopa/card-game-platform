import { Card_COLOR, CARD_FORM, GAME_POINTS } from "../properties/card.properties";

export class Card {
    private name: string;
    private form: CARD_FORM;
    private color?: Card_COLOR;

    constructor(name: string, form: CARD_FORM, color?: Card_COLOR) {
        this.name = name;
        this.form = form;
        this.color = color;
    }

    getName() {
        return this.name;
    }

    isPoint() {
        return GAME_POINTS.indexOf(this.name) >= 0;
    }

    getImagePath(): string {
        return 'j + this.forms[i];';
    }
}