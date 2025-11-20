// src/app/tab1/tab1.page.ts
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
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';
import { LocationService } from '../services/location.service';

type PlaceWithDistance = Place & { distanceLabel?: string; distanceKm?: number };

@Component({
  standalone: true,
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonButtons,
    IonButton,
  ],
})
export class Tab1Page implements OnInit {
  places: PlaceWithDistance[] = [];
  locationError?: string;

  constructor(
    private placeService: PlaceService,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    await this.loadPlacesWithDistance();
  }

  async ionViewWillEnter() {
    await this.loadPlacesWithDistance();
  }

  private async loadPlacesWithDistance() {
    const basePlaces = await this.placeService.getAll();
    this.places = basePlaces as PlaceWithDistance[];

    try {
      const pos = await this.locationService.getCurrentPosition();
      const { latitude, longitude } = pos.coords;

      this.places = this.places.map((p) => {
        const dKm = this.computeDistanceKm(latitude, longitude, p.lat, p.lng);
        return {
          ...p,
          distanceKm: dKm,
          distanceLabel: this.formatDistance(dKm),
        };
      });

      this.places.sort(
        (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
      );
    } catch (e) {
      console.error(e);
      this.locationError =
        'Position actuelle indisponible. Les distances ne peuvent pas être calculées.';
    }
  }

  // Formule de Haversine pour calculer la distance en km
  private computeDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // km
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Format “à 350 m de vous” ou “à 2,1 km de vous”
  private formatDistance(km: number): string {
    if (km < 1) {
      const m = Math.round(km * 1000);
      return `à ${m} m de vous`;
    } else {
      const rounded = Math.round(km * 10) / 10;
      const str = rounded.toString().replace('.', ',');
      return `à ${str} km de vous`;
    }
  }
}
