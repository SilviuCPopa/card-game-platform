import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { PlayerHandComponent } from './components/player-hand/player-hand.component';
import { HelperService } from './common/services/helper.service';

const config: SocketIoConfig = { url: environment.socketUrl, options: { query: `playerId=${getPlayerId()}`} };

@NgModule({
  declarations: [
    AppComponent,
    PlayerHandComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

function getPlayerId(): string {
  const playerId = localStorage.getItem('playerId');
  console.log(!!playerId ? playerId : HelperService.uuidv4());
  console.log(isValidPlayerId(playerId) ? playerId : HelperService.uuidv4());
  return isValidPlayerId(playerId) ? playerId : HelperService.uuidv4();
}

function isValidPlayerId(playerId: string) {
  return !!player && player !== null;
}
