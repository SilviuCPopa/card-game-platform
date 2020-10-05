import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameSocket = this.socket.fromEvent<Document>('game');

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.gameSocket.subscribe( data => {
      console.log(data);
    });
  }
}
