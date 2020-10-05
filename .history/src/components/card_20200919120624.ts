import { CARD_COLOR, CARD_FORM, GAME_POINTS } from "../properties/card.properties";

export class CARD {
    name: string;
    form: CARD_FORM;
    color: CARD_COLOR;

    constructor(name: string, form: CARD_FORM, color: CARD_COLOR) {
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