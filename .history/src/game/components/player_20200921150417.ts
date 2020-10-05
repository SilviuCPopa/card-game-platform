import { Hand } from "./hand";
import { v4 as uuidv4 } from 'uuid';

export abstract class Player {
    private uuid: string = null;
    private name: string;
    private hand: Hand = new Hand([]);

    constructor(name: string) {
        this.name = name;
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
}

export class HumanPlayer extends Player {}