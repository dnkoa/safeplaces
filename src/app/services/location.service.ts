// src/app/services/location.service.ts
import { Injectable } from '@angular/core';
import {
  Geolocation,
  PermissionStatus,
  Position,
} from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class LocationService {
  /**
   * Vérifie les permissions de localisation actuelles
   */
  async checkPermissions(): Promise<PermissionStatus> {
    return Geolocation.checkPermissions();
  }

  /**
   * Demande les permissions de localisation à l'utilisateur
   */
  async requestPermissions(): Promise<PermissionStatus> {
    return Geolocation.requestPermissions();
  }

  /**
   * Retourne la position actuelle, en demandant la permission si nécessaire.
   * Lève une erreur si l'utilisateur refuse.
   */
  async getCurrentPosition(): Promise<Position> {
    const status = await this.checkPermissions();

    if (status.location !== 'granted') {
      const req = await this.requestPermissions();
      if (req.location !== 'granted') {
        throw new Error('Permission localisation refusée');
      }
    }

    return Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000, // 10 secondes
    });
  }
}
