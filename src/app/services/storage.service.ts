import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    // On crée nous-mêmes l'instance de Storage
    const storage = new Storage();
    this._storage = await storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage!.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this._storage) {
      await this.init();
    }
    return (await this._storage!.get(key)) ?? null;
  }
}
