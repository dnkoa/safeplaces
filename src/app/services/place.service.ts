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
}
