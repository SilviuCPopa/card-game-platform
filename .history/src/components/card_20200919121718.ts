import { Card_COLOR, Card_FORM, GAME_POINTS } from "../properties/card.properties";

export class Card {
    name: string;
    form: Card_FORM;
    color?: Card_COLOR;

    constructor(name: string, form: Card_FORM, color?: Card_COLOR) {
        this.name = name;
        this.form = form;
        this.color = color;
    }

    isPoint() {
        return GAME_POINTS.indexOf(this.name) >= 0;
    }

    getImagePath(): string {
        return 'j + this.forms[i];';
    }
}