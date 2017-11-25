import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StreamTableComponent } from './stream-table/stream-table.component';
import { StreamBarchartComponent } from './stream-barchart/stream-barchart.component';
import {ServerSocket} from './socket/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    StreamTableComponent,
    StreamBarchartComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ServerSocket
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
