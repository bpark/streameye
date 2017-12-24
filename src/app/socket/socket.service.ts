import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import { Observable } from 'rxjs/Observable';
import websocketConnect, {IWebSocket} from 'rxjs-websockets';
import 'rxjs/add/operator/share';
import * as SockJS from 'sockjs-client';
import {AppConfig} from '../config/app-config';

@Injectable()
export class ServerSocket {
  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>;
  public connectionStatus: Observable<number>;

  public connect(appConfig: AppConfig) {
    if (this.messages) {
      return;
    }

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    /*
    const {messages, connectionStatus} = websocketConnect(
      'ws://localhost:3000/echo',
      this.inputStream = new QueueingSubject<string>()
    );*/

    const {messages, connectionStatus} = websocketConnect(
      appConfig.streamingUrl,
      this.inputStream = new QueueingSubject<string>(),
      undefined,
      sockJsWebsocketFactory
    );
    this.messages = messages.share();
    this.connectionStatus = connectionStatus.share();
  }

  public send(message: string): void {
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message);
  }
}

const sockJsWebsocketFactory = (url: string, protocol?: string | string[]): IWebSocket => {
  return new SockJS(url,  null, {transports: protocol});
};

