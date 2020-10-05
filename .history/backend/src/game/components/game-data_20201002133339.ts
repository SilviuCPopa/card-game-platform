import { GameAction } from "../interfaces/game-data.interfaces";

export class GameData {
    private observers: any[] = [];
    private action: GameAction;

    setAction(action: GameAction) {
        this.action = action;
        this.notifyObservables();
    }

    registerObservers(observer: any) {
        console.log('register', observer);
        this.observers.push(observer);
    }

    private notifyObservables() {
        console.log(this.observers);
        this.observers.forEach( observer => {
            observer.update(this.action);
        });
    }
}