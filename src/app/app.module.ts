import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SuiModule } from 'ng2-semantic-ui';
import { ValueArrayPipe } from './value-array.pipe';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';

const _socketIoConfig: SocketIoConfig = {
  url: "http://localhost:3000", 
  options: {}
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ValueArrayPipe,
    WelcomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(_socketIoConfig),
    SuiModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
