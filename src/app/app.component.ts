import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
  <img src="../assets/patreon.png" class="patreon-badge" onClick="window.open('https://www.patreon.com/chillujutv', '_BLANK')">
  <div class="foo">
      <div class="foo-links">
          <div class="text-left">
              <span class="foo-link">&copy; 2019 Chilluju.tv</span>
          </div>
          <div class="text-right">
              <span class="foo-link link">Podmínky používání</span>
              <span class="foo-link link">Kontakt</span>
          </div>
      </div>
  </div>
  <ng-template #clientNavLinks>
      <button class="ui red right floated column button" routerLink="/aa" style="height: 36px;position: relative;right: 79px;border-radius: 0px;">
          Odhlásit se
          </button>
          <button class="ui red right floated column button" routerLink="/aa" style="height: 36px;position: relative;right: 79px;border-radius: 0px;margin-right: 15px;">
          Můj účet
      </button>
  </ng-template>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('clientNavLinks')
  clientNavLinksRef: TemplateRef<any>;

  constructor() {}

}

