export interface AppConfig {
  streamingUrl: string;
  connectMethod?: ConnectionType;
}

export enum ConnectionType {
  WS = 'WS',
  SockJS = 'SockJS'
}
