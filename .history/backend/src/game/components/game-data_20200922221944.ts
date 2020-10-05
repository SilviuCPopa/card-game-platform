
export class GameData {
    private observers: any[] = [];
    private action: any;

    setAction(action: any) {
        this.action = action;
        this.notifyObservables();
        console.log('here');
    }

    registerObservers(observer: any) {
        console.log('here, register');
        this.observers.push(observer);
    }

    private notifyObservables() {
        this.observers.forEach( observer => {
            observer.update(this.action);
        });
    }
}