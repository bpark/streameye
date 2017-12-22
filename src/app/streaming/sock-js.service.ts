import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';

@Injectable()
export class SockJsService {

  constructor() {
  }

  public connect() {
    const socket = new SockJS('http://localhost:3000/streams');

    console.log('socket created');

    socket.onopen = (ev) => {
      console.log('on open called');
      socket.send('hello');
    };

    socket.onmessage = (ev) => {
      console.log('received message');
      console.log(ev.data);
    };
  }

}
