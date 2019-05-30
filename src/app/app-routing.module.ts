import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class AppRoutingMethods {

  constructor(private _socketService: SocketService, private _cookieService: CookieService) {}

  logOut(token: String) {
    if (this._cookieService.check('app-token')) {
      this._socketService.emit('client logout', token)
    }
  }

}