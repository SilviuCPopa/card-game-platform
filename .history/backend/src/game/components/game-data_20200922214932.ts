import { Subject } from "rxjs/internal/Subject";


export class GameData {
    gameDataSubject$ = new Subject();

    update(action: any) {
        this.notifyObservables(action);
    }

    private notifyObservables(action: any) {
        console.log(action);
        this.gameDataSubject$.next(action)
    }
}