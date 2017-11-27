import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './app-config';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('config');
  }

}
