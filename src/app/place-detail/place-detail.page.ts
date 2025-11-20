// src/app/place-detail/place-detail.page.ts
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
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';
import { LocationService } from '../services/location.service';

@Component({
  standalone: true,
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
  ],
})
export class PlaceDetailPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private placeService = inject(PlaceService);
  private locationService = inject(LocationService);
  private fb = inject(FormBuilder);

  place?: Place;
  isEditing = false;
  loadingLocation = false;

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['autre', Validators.required],
    address: ['', Validators.required],
    phone: [''],
    lat: ['', Validators.required],
    lng: ['', Validators.required],
    note: [''],
  });

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const existing = await this.placeService.getById(id);
    if (!existing) return;

    this.place = existing;

    this.form.patchValue({
      name: existing.name,
      category: existing.category,
      address: existing.address,
      phone: existing.phone ?? '',
      lat: existing.lat.toString(),
      lng: existing.lng.toString(),
      note: existing.note ?? '',
    });
  }

  get canEdit(): boolean {
    return !!this.place;
  }

  enableEdit() {
    if (!this.place) return;
    this.isEditing = true;
  }

  cancelEdit() {
    if (!this.place) return;
    this.isEditing = false;

    this.form.patchValue({
      name: this.place.name,
      category: this.place.category,
      address: this.place.address,
      phone: this.place.phone ?? '',
      lat: this.place.lat.toString(),
      lng: this.place.lng.toString(),
      note: this.place.note ?? '',
    });
  }

  /**
   * Utiliser la position actuelle pour mettre à jour lat/lng en mode édition
   */
  async useCurrentLocationForEdit() {
    this.loadingLocation = true;
    try {
      const position = await this.locationService.getCurrentPosition();
      const coords = position.coords;

      this.form.patchValue({
        lat: coords.latitude.toString(),
        lng: coords.longitude.toString(),
      });

      alert('Coordonnées GPS actuelles appliquées au lieu.');
    } catch (e: any) {
      console.error(e);
      alert(
        "Impossible de récupérer votre position. Vérifiez la localisation et les permissions GPS."
      );
    } finally {
      this.loadingLocation = false;
    }
  }

  async saveChanges() {
    if (!this.place || this.form.invalid) return;

    const v = this.form.value;

    try {
      await this.placeService.update(this.place.id, {
        name: v.name!,
        category: v.category as any,
        address: v.address!,
        phone: v.phone || undefined,
        lat: Number(v.lat),
        lng: Number(v.lng),
        note: v.note || undefined,
      });

      this.place = {
        ...this.place,
        name: v.name!,
        category: v.category as any,
        address: v.address!,
        phone: v.phone || undefined,
        lat: Number(v.lat),
        lng: Number(v.lng),
        note: v.note || undefined,
      };

      this.isEditing = false;
      alert('Lieu mis à jour avec succès.');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la mise à jour du lieu.');
    }
  }

  async deletePlace() {
    if (!this.place) return;

    const ok = confirm('Voulez-vous vraiment supprimer ce lieu ?');
    if (!ok) return;

    try {
      await this.placeService.delete(this.place.id);
      alert('Lieu supprimé.');
      this.router.navigateByUrl('/tabs/tab1');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la suppression du lieu.');
    }
  }
}
