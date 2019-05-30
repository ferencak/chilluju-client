import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private _socket: Socket) { }

  get socket() {
    return this._socket
  }

  emit(event: string, args: any) {
    this._socket.emit(event, args)
  }

  waitForResponse(eventName) {
    return new Promise(resolve => {
      this._socket.on(eventName, (data) => {
        resolve(data)
      })
    })
  }

}
