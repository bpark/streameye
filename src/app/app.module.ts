import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StreamTableComponent } from './stream-table/stream-table.component';
import { StreamBarchartComponent } from './stream-barchart/stream-barchart.component';
import {ServerSocket} from './socket/socket.service';
import {ConfigService} from './config/config.service';
import {HttpClientModule} from '@angular/common/http';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    StreamTableComponent,
    StreamBarchartComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Angular2FontawesomeModule
  ],
  providers: [
    ServerSocket,
    ConfigService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
