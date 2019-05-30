import { Injectable } from '@angular/core';
import { SocketService } from './socket.service'

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  _packages: object

  constructor(private _socketService: SocketService) { }

  load() {
    return new Promise(async (resolve) => {
      this._socketService.emit('get packages', [])
      this._packages = await this._socketService.waitForResponse('retrieve packages')
      resolve(this._packages)
    })
  }

  get packages() {
    return this._packages
  }

}
