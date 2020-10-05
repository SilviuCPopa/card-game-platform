import { Hand } from "./hand";

export abstract class Player {
    private name: string;
    private hand: Hand;

    constructor(name: string, hand: Hand) {
        this.name = name;
        this.hand = hand;
    }

    getName() {
        return this.name;
    }
}

export class HumanPlayer extends Player {}