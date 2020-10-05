import { GamePoints } from "../properties/card.properties";

export class Card {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    isPoint() {
        return GamePoints.indexOf(this.name) >= 0;
    }

    getImagePath(): string {
        return '';
    }
}