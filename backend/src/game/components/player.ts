import { Hand } from "./hand";
import { v4 as uuidv4 } from 'uuid';

export abstract class Player {
    private uuid: string = null;
    private name: string;
    private hand: Hand = new Hand([]);
    private score: number = 0;

    constructor(uuid: string, name: string) {
        this.name = name;
        this.uuid = uuid || uuidv4();
    }

    resetScore() {
        this.score = 0;
    }

    getScore() {
        return this.score;
    }

    addPoints(points: number) {
        this.score += points;
    }

    setHand(hand: Hand) {
        this.hand = hand;
    }

    getHand() {
        return this.hand;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.uuid;
    }
}

export class HumanPlayer extends Player {}  