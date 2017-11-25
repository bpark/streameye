import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private serverSocket: ServerSocket) {
  }

  ngOnInit() {
    this.serverSocket.connect();
  }

  clicked(event) {
    this.serverSocket.send('hello world');
  }

  ngOnDestroy() {
  }
}
