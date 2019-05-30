import { ClientService } from './../client.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isReady: Boolean = false
  loginForm: FormGroup
  submitted: Boolean
  isResponse: Boolean = false
  response: Object = {}

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private _clientService: ClientService, 
    private _cookieService: CookieService
  ) { }
  
  get f() { return this.loginForm.controls }

  async ngOnInit() {
    let clientCheckEvent = await this._clientService.client
    if(clientCheckEvent[0] == true) {
      return this.router.navigate(['/'])
    }
    this.isReady = true
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
        return
    }
    let response = await this._clientService.login(this.loginForm.value)
    this.isResponse = true
    switch(response[0]) {
      case 'SUCCESSFUL':
        this._cookieService.set('app-token', response[1], new Date('Thu, 01 Jan 2020 00:00:01 GMT'), '/')
        this.response = { type: 'success', message: 'Přihlášení proběhlo úspěšně, budete přesměrován.'}
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2300)
      break
      case 'BAD_PASSWORD':
        this.response = { type: 'negative', message: 'Zadané heslo či emailová adresa není správné.'}
      break
    }
    
  }

  routeToHome() {
    this.router.navigate(['/'])
  }

}
