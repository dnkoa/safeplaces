import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule 
  ],
})
export class Tab3Page {
  constructor() {}
}
