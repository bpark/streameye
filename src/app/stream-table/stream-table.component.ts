import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LimitedQueue} from '../chart/chart-data';
import {ServerSocket} from '../socket/socket.service';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

@Component({
  selector: 'app-stream-table',
  templateUrl: './stream-table.component.html',
  styleUrls: ['./stream-table.component.scss'],
  providers: []
})
export class StreamTableComponent implements OnInit {

  messageObserver: Observable<string[]>;
  private filter = '';

  constructor(private serverSocket: ServerSocket) { }

  ngOnInit() {

    const itemQueue = new LimitedQueue<string>(10, 'test');
    this.messageObserver = this.serverSocket.messages
      .filter(value => value.includes(this.filter))
      .bufferCount(10)
      .map(items => itemQueue.enqueueAll(items));

  }

  onKey(event: any) { // without type info
    this.filter = event.target.value;
  }

}
