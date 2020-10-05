import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { PlayerHandComponent } from './components/player-hand/player-hand.component';

const config: SocketIoConfig = { url: environment.socketUrl, options: { query: `socketId=${localStorage.getItem('socketId')}`} };

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

