import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ServerSocket} from '../socket/socket.service';
import {ChartData, single, chartDataQueue} from '../chart/chart-data';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';


@Component({
  selector: 'app-stream-barchart',
  templateUrl: './stream-barchart.component.html',
  styleUrls: ['./stream-barchart.component.scss'],
  providers: []
})
export class StreamBarchartComponent implements OnInit {

  countSubscription: Subscription;
  single: any[];

  //  view: any[] = [700, 400];

  // options
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#ea6100']
  };

  constructor(private serverSocket: ServerSocket) {
    for (let i = 0; i < 100; i++) {
      chartDataQueue.enqueue(new ChartData(0));
    }
    Object.assign(this, {single});

  }

  ngOnInit() {
    this.countSubscription = this.serverSocket.messages.bufferTime(1000).map(items => items.length).subscribe((count: number) => {
      const data = chartDataQueue.enqueue(new ChartData(count));
      this.single = [...data];
    });
  }

}
