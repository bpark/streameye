import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from './socket/socket.service';
import {ConfigService} from './config/config.service';
import {Observable} from 'rxjs/Observable';
import {SockJsService} from './streaming/sock-js.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {

  connectionStatusObserver: Observable<string>;

  hasError = false;
  isReady = false;

  private classMapping = new Map<number, string>([[0, 'chain-broken'], [1, 'link']]);


  constructor(private serverSocket: ServerSocket,
              private configService: ConfigService,
              private sockJsService: SockJsService) {
  }

  ngOnInit() {
    this.sockJsService.connect();
    this.configService.getConfig().subscribe(
      appConfig => {
        this.isReady = true;
        this.serverSocket.connect();
        this.connectionStatusObserver = this.serverSocket.connectionStatus.map(value => this.classMapping.get(value));
      },
      error => {
        this.hasError = true;
    });
  }

  clicked() {
    this.serverSocket.send('hello world');
  }

  ngOnDestroy() {
  }

}
