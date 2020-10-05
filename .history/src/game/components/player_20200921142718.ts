import { Hand } from "./hand";

export abstract class Player {
    private name: string;
    private hand: Hand = new Hand([]);

    constructor(name: string) {
        this.name = name;
    }

    setHand(hand: Hand) {
        this.hand = hand;
    }
}

export class HumanPlayer extends Player {}