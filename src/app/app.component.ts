import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from './comlink/server-socket.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import {ChartData, LimitedQueue, single, chartDataQueue} from './chart/chart-data';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerSocket]
})
export class AppComponent implements OnInit, OnDestroy {
  messageObserver: Observable<string[]>;
  countSubscription: Subscription;

  single: any[];
  multi: any[];

//  view: any[] = [700, 400];

  // options
  showXAxis = false;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#a41956']
  };


  constructor(private serverSocket: ServerSocket) {
    for (let i = 0; i < 100; i++) {
      chartDataQueue.enqueue(new ChartData(0));
    }
    Object.assign(this, {single});

  }

  ngOnInit() {

    this.serverSocket.connect();

    const itemQueue = new LimitedQueue<string>(10, 'test');
    this.messageObserver = this.serverSocket.messages.bufferCount(10).map(items => itemQueue.enqueueAll(items));

    this.countSubscription = this.serverSocket.messages.bufferTime(1000).map(items => items.length).subscribe((count: number) => {
      const data = chartDataQueue.enqueue(new ChartData(count));
      this.single = [...data];
    });

  }

  clicked(event) {
    this.serverSocket.send('hello world');
  }

  ngOnDestroy() {
  }
}
