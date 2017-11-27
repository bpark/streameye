import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from './socket/socket.service';
import {ConfigService} from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {

  hasError = false;
  isReady = false;

  constructor(private serverSocket: ServerSocket,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.getConfig().subscribe(
      appConfig => {
        this.isReady = true;
        this.serverSocket.connect();
      },
      error => {
        this.hasError = true;
    });
  }

  clicked(event) {
    this.serverSocket.send('hello world');
  }

  ngOnDestroy() {
  }
}
