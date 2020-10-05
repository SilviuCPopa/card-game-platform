
export class GameData {
    private observers: any[] = [];
    private action: GameData;

    setAction(action: GameData) {
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