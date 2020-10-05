import { GameAction } from "../interfaces/game-data.interfaces";

export class GameData {
    private observers: any[] = [];
    private action: GameAction;

    setAction(action: GameAction) {
        console.log('action gameDate', action);
        this.action = action;
        this.notifyObservables();
    }

    registerObservers(observer: any) {
        this.observers.push(observer);
    }

    private notifyObservables() {
        this.observers.forEach( observer => {
            observer.update(this.action);
        });
    }
}