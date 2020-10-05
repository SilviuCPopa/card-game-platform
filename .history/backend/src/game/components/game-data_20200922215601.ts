import { Subject } from "rxjs/internal/Subject";


export class GameData {
    gameDataSubject$ = new Subject();

    update(action: any) {
        this.notifyObservables(action);
    }

    private notifyObservables(action: any) {
        this.gameDataSubject$.next(action)
    }
}