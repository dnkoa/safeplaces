import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Place } from '../models/place';

const PLACES_KEY = 'places';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  constructor(private storage: StorageService) {}

  async getAll(): Promise<Place[]> {
    return (await this.storage.get<Place[]>(PLACES_KEY)) || [];
  }

  async getById(id: string): Promise<Place | undefined> {
    const all = await this.getAll();
    return all.find((p) => p.id === id);
  }

  async add(place: Omit<Place, 'id' | 'createdAt'>): Promise<void> {
    const all = await this.getAll();

    const newPlace: Place = {
      ...place,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    all.push(newPlace);
    await this.storage.set(PLACES_KEY, all);
  }

  // 🔹 Mise à jour d’un lieu existant
  async update(id: string, changes: Partial<Place>): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex((p) => p.id === id);
    if (index === -1) return;

    all[index] = {
      ...all[index],
      ...changes,
      id: all[index].id, // on ne touche pas à l'id
    };

    await this.storage.set(PLACES_KEY, all);
  }

  // 🔹 Suppression d’un lieu
  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter((p) => p.id !== id);
    await this.storage.set(PLACES_KEY, filtered);
  }
}
