import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  client: Object
  isLogged: Boolean
  welcomeMessageList: any = [
    {text: "Ty nejlepší filmy či seriály jsou nyní na jednom místě. Pojď a přesvědč se o tom sám na <span class='bold'>Chilluju.tv</span>."},
    {text: "Nevíš, jaksý film si pustit? Neměj obavy a <br/><a class='text-red'>prozkoumej</a> nejlépe hodnocené filmy."}
  ]
  welcomeMessage: any
  @Input('clientNavLinksTempRef') 
  private clientNavLinksTempRef:TemplateRef<any>
  constructor(
    private _clientService: ClientService,
  ) {
    this.welcomeMessage = this.welcomeMessageList[Math.floor(Math.random() * this.welcomeMessageList.length)]
    if (this.welcomeMessage === undefined) {
      this.welcomeMessage[0]
    }
  }

  async ngOnInit() {
    this.client = await this._clientService.client
    this.isLogged = this.client[0]
  }

}

