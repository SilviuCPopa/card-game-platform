import { Subject } from "rxjs/internal/Subject";


export class GameData {
    private observers: any[];
    private action: any;

    setAction(action: any) {
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