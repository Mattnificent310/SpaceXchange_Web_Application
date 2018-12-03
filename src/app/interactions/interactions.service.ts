import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';

/**
 * @description
 * @class
 */
@Injectable()
export class InteractionsService {
  socket;
  messages: Rx.Subject<any>;
  constructor(private http: Http) {
    this.messages = <Rx.Subject<any>>(
      this.connect().map(
        (response: any): any => {
          return response;
        }
      )
    );
  }
  sendMsg(msg): any {
    return this.messages.next(msg);
  }
  connect(): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io('http://localhost:5000');

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable(observe => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server')
        return observe.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        return this.socket.emit('message', JSON.stringify(data));
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http
        .get('/interactions/' + room)
        .map(res => res.json())
        .subscribe(res => {
            resolve(res);
          }, err => {
            reject(err);
          });
    });
  }

  showChat(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/interactions/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/interactions', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateChat(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/interactions/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteChat(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/interactions/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
