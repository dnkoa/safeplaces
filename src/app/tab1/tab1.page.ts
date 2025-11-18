import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonButtons
  
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    // Composants Ionic utilisés dans tab1.page.html
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonButtons    
    
  ],
})
export class Tab1Page implements OnInit {
  places: Place[] = [];

  constructor(private placeService: PlaceService) {}

  async ngOnInit() {
    // Chargement initial de la liste
    this.places = await this.placeService.getAll();
  }

  async ionViewWillEnter() {
    // Rechargement de la liste quand on revient sur l'onglet
    this.places = await this.placeService.getAll();
  }
}
