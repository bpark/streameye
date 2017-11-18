import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from './comlink/server-socket.service';
import {Subscription} from 'rxjs/Subscription';
import * as Collections from 'typescript-collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/bufferCount';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerSocket]
})
export class AppComponent implements OnInit, OnDestroy {
  private static MAX_QUEUE_SIZE = 2000;
  private socketSubscription: Subscription;
  messageQueue = new Collections.Queue();
  messageObserver: Observable<string[]>;

  constructor(private serverSocket: ServerSocket) {
  }

  ngOnInit() {
    this.serverSocket.connect();

    this.messageObserver = this.serverSocket.messages.bufferCount(20);

    this.socketSubscription = this.serverSocket.messages.subscribe((message: string) => {
      console.log('received message from server: ', message);
      if (this.messageQueue.size() >= AppComponent.MAX_QUEUE_SIZE) {
        this.messageQueue.dequeue();
      }
      this.messageQueue.enqueue(message);
    });

  }

  clicked(event) {
    this.serverSocket.connect();
    this.serverSocket.send('hello world');
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }
}
