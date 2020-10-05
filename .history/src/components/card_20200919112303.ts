import { GAME_POINTS } from "../properties/card.properties";

export class CARD {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    isPoint() {
        return GAME_POINTS.indexOf(this.name) >= 0;
    }

    getImagePath(): string {
        return '';
    }
}