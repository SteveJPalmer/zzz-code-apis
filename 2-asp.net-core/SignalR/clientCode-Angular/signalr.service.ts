import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { SignalRConnectionInfo } from '../models/signalr-connection-info';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AWBStatusInfo } from '../models/awbstatusinfo';

@Injectable()
export class SignalRService {

  private readonly _http: HttpClient;
  private readonly _baseUrl: string; // = "http://localhost:7071/api/";
  private hubConnection: HubConnection;
  messages: Subject<AWBStatusInfo> = new Subject();

  constructor(http: HttpClient, @Inject('SIGNALR_BASE_URL') signalRBaseUrl: string) {
    this._http = http;
    this._baseUrl = signalRBaseUrl;
  }

  private getConnectionInfo(): Observable<any> {
    let requestUrl = `${this._baseUrl}signalrinfo`;
    return this._http.get<SignalRConnectionInfo>(requestUrl);
  }

  init() {
    this.getConnectionInfo().subscribe((info: SignalRConnectionInfo) => {
      const options = {
        accessTokenFactory: () => info.accessToken
      };
      this.createConnection(info.url, options);
      this.startConnection();
    },
      error => {
        console.error(`An error occurred during init: ${error}`);
        console.log('Retrying connection to Azure Function - SignalR Hub ...');
        setTimeout(() => {
          this.init();
        }, 10000);
      });
  }

  private createConnection(url: string, options: any) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, options)
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection.onclose(err => {
      console.log('Azure Function - SignalR Hub connection closed.');
      this.stopHubAndunSubscribeToServerEvents();
      this.restartConnection(err);
    });
  }
  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Azure Function - SignalR Hub connection started.');
        this.subscribeToServerEvents();
      })
      .catch(err => {
        this.restartConnection(err);
      });
  }
  private restartConnection(err: Error): void {
    console.log(`Error ${err}`);
    console.log('Retrying connection to Azure Function - SignalR Hub ...');
    setTimeout(() => {
      this.startConnection();
    }, 10000);
  }

  private subscribeToServerEvents(): void {
    this.hubConnection.on('awbStatusUpdated', (data: any) => {
      this.messages.next(data);
    });
  }
  private stopHubAndunSubscribeToServerEvents(): void {
    this.hubConnection.off('sendMessage');
    this.hubConnection.stop().then(() => console.log('Hub connection stopped'));
  }
  
}
