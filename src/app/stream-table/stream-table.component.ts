import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LimitedQueue} from '../chart/chart-data';
import {ServerSocket} from '../socket/socket.service';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

@Component({
  selector: 'app-stream-table',
  templateUrl: './stream-table.component.html',
  styleUrls: ['./stream-table.component.scss'],
  providers: []
})
export class StreamTableComponent implements OnInit {

  messageObserver: Observable<string[]>;

  constructor(private serverSocket: ServerSocket) { }

  ngOnInit() {

    const itemQueue = new LimitedQueue<string>(10, 'test');
    this.messageObserver = this.serverSocket.messages.bufferCount(10).map(items => itemQueue.enqueueAll(items));

  }

}