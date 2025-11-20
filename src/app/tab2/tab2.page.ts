// src/app/tab2/tab2.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from '@ionic/angular/standalone';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PlaceService } from '../services/place.service';
import { LocationService } from '../services/location.service';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
  ],
})
export class Tab2Page {
  private fb = inject(FormBuilder);
  private placeService = inject(PlaceService);
  private locationService = inject(LocationService);
  private router = inject(Router);

  loading = false;
  loadingLocation = false;

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['hopital', Validators.required],
    address: ['', Validators.required],
    phone: [''],
    lat: ['', Validators.required],
    lng: ['', Validators.required],
    note: [''],
  });

  /**
   * Utiliser la position GPS actuelle pour remplir lat/lng
   */
  async useCurrentLocation() {
    this.loadingLocation = true;
    try {
      const position = await this.locationService.getCurrentPosition();
      const coords = position.coords;

      this.form.patchValue({
        lat: coords.latitude.toString(),
        lng: coords.longitude.toString(),
      });

      alert('Coordonnées GPS récupérées avec succès.');
    } catch (e: any) {
      console.error(e);
      alert(
        "Impossible de récupérer votre position.\n" +
          "Vérifiez que la localisation est activée et que l'application a la permission GPS."
      );
    } finally {
      this.loadingLocation = false;
    }
  }

  /**
   * Enregistrer un nouveau lieu
   */
  async save() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const value = this.form.value;

    try {
      await this.placeService.add({
        name: value.name!,
        category: value.category as any,
        address: value.address!,
        phone: value.phone || undefined,
        lat: Number(value.lat),
        lng: Number(value.lng),
        note: value.note || undefined,
      });

      alert('Lieu enregistré localement !');
      this.router.navigateByUrl('/tabs/tab1');
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement du lieu.");
    } finally {
      this.loading = false;
    }
  }
}
