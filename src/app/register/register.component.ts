import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../validators/mustMatch.validator'
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isReady: boolean = false
  registerForm: FormGroup
  submitted: Boolean
  isResponse: Boolean = false
  response: Object = {}

  constructor(private formBuilder: FormBuilder, private _clientService: ClientService, private router: Router) {    }

  get f() { return this.registerForm.controls }

  async ngOnInit() {
    let res = await this._clientService.client
    if(res[0] == true) {
      return this.router.navigate(['/'])
    }
    this.isReady = true
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  async onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
        return
    }
    delete this.registerForm.value.confirmPassword
    let response = await this._clientService.create(this.registerForm.value)
    this.isResponse = true
    switch(response) {
      case 'SUCCESSFUL':
        this.response = {type: 'success', message: 'Registrace proběhla úspěšně!'}
      break
      case 'EMAIL_ALREADY_USED': 
        this.response = {type: 'negative', message: 'Emailová adresa je již registrovaná!'}
      break
    }
  }

  routeToHome() {
    this.router.navigate(['/'])
  }

}
