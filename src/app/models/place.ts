export type PlaceCategory = 'hopital' | 'police' | 'bibliotheque' | 'wifi' | 'autre';

export interface Place {
  id: string;         // généré côté app (Date.now().toString())
  name: string;
  category: PlaceCategory;
  address: string;
  phone?: string;
  lat: number;
  lng: number;
  note?: string;
  createdAt: number;  // timestamp
}
