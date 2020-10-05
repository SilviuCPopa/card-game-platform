import { GameAction } from "../interfaces/game-data.interfaces";

export class GameData {
    private observers: any[] = [];
    private action: GameAction;

    setAction(action: GameAction) {
        this.action = action;
        console.log('action', action.key);
        this.notifyObservables();
    }

    registerObservers(observer: any) {
        this.observers.push(observer);
    }

    private notifyObservables() {
        console.log(this.observers);
        this.observers.forEach( observer => {
            observer.update(this.action);
        });
    }
}