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

  view: number[] = undefined;

  // options
  animations = false;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  tooltipDisabled = true;
  barPadding = 8;

  colorScheme = {
    domain: ['#ea6100']
  };

  constructor(private serverSocket: ServerSocket) {
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
      chartDataQueue.enqueue(new ChartData(0, this.formatXAxis(new Date(now - 101000 + i * 1000))));
    }
    Object.assign(this, {single});

  }

  ngOnInit() {
    this.countSubscription = this.serverSocket.messages.bufferTime(1000).map(items => items.length).subscribe((count: number) => {
      const data = chartDataQueue.enqueue(new ChartData(count, this.formatXAxis(new Date())));
      this.single = [...data];
    });
  }

  private formatXAxis(date: Date): string {
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2);
  }
}
