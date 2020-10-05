import { Subject } from "rxjs/internal/Subject";


export class GameData {
    gameDataSubject$ = new Subject();

    constructor() {
        this.gameDataSubject$.subscribe(data => {
            console.log('data', data);
        })
    }

    update(action: any) {
        this.notifyObservables(action);
    }

    private notifyObservables(action: any) {
        this.gameDataSubject$.next(action)
    }
}