import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startRoundEvent = this.socket.fromEvent<Document>('START_ROUND');

  cards: any = [];

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.startRoundEvent.subscribe( (data: any) => {
      console.log(data);
      this.cards = Object.values(data)[0]['hand']['cards'];
    });

    this.socket.emit('start');
  }
}
