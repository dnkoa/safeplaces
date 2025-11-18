import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async getCurrentPosition() {
    const perm = await Geolocation.requestPermissions();
    // tu peux vérifier perm.location si besoin
    return Geolocation.getCurrentPosition();
  }
}
