import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';
import { UUID } from 'angular2-uuid'
import { Injectable } from '@angular/core';
import * as shajs from 'sha.js'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  _client: object = {}
  _isLogged: boolean

  constructor(private _socketService: SocketService, private _cookieService: CookieService) { }

  get client() {
    return this.logged()
  }

  logged() {
    return new Promise(async (resolve) => {
      if (!this._cookieService.check('app-token')) {
        this._cookieService.set('app-token', UUID.UUID(), new Date('Thu, 01 Jan 2020 00:00:01 GMT'), '/')
      }
      this._socketService.emit('is client logged', [this._cookieService.get('app-token')])
      this._client = await this._socketService.waitForResponse('client checked')
      resolve(this._client)
    })
  }

  create(form) {
    return new Promise(async (resolve) => {
      let crypted = shajs('sha256').update(form.password).digest('hex')
      delete form.password
      form.passwordHash = crypted
      this._socketService.emit('new client', form)
      let response = await this._socketService.waitForResponse('new client')
      resolve(response)
    })
  }

  login(form) {
    return new Promise(async (resolve) => {
      let crypted = shajs('sha256').update(form.password).digest('hex')
      delete form.password
      form.passwordHash = crypted
      this._socketService.emit('login client', form)
      let response = await this._socketService.waitForResponse('login client')
      resolve(response)
    })
  }

}
