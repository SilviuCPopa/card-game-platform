
export abstract class Player {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class HumanPlayer extends Player {}