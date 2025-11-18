import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  ],
})
export class PlaceDetailPage {
  private route = inject(ActivatedRoute);
  private placeService = inject(PlaceService);

  place?: Place;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.place = await this.placeService.getById(id);
  }
}
