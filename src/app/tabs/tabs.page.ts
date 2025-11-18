import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel,IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locate, add, information} from 'ionicons/icons';
import { circle, map } from 'leaflet';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ locate, add, information });
  }
}
