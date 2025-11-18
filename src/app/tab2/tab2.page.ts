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

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Composants Ionic utilisés dans tab2.page.html
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
  private router = inject(Router);

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['autre', Validators.required],
    address: ['', Validators.required],
    phone: [''],
    lat: ['', Validators.required],
    lng: ['', Validators.required],
    note: [''],
  });

  async save() {
    if (this.form.invalid) return;
    this.loading = true;

    try {
      const value = this.form.value;

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
      // retour à la liste (Tab1)
      this.router.navigateByUrl('/tabs/tab1');
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement.");
    } finally {
      this.loading = false;
    }
  }
}
