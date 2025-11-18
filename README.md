# 📱 SafePlaces – Application Mobile Ionic/Android

**Version : 1.0**
**Technologies : Ionic 7 • Angular • Capacitor • Leaflet (optionnel) • Ionic Storage**
**Plateforme cible : Android**

---

## 🔎 1. Présentation du projet

**SafePlaces** est une application mobile destinée aux étudiants et citoyens souhaitant identifier rapidement des **lieux sûrs et utiles** autour d’eux :

* Hôpitaux
* Commissariats / Police
* Bibliothèques
* Espaces Wi-Fi
* Centres de santé
* Autres lieux d’importance

L’application fonctionne **100 % hors-ligne** pour les données enregistrées.
Elle utilise les **fonctions natives** du téléphone et communique avec une **API publique gratuite** (OpenStreetMap / Nominatim) pour la recherche d’adresses.

---

## 🎯 2. Objectifs pédagogiques

Cette application a été développée pour répondre à **6 exigences académiques** :

| Exigence                                      | Réalisation dans SafePlaces                            |
| --------------------------------------------- | ------------------------------------------------------ |
| 1. Concevoir une app Android (native/hybride) | Ionic + Angular + Capacitor → APK Android              |
| 2. Navigation multi-écrans fluide             | Tabs (Carte, Liste, À propos) + pages Ajout et Détail  |
| 3. Fonctionnalité native                      | GPS (géolocalisation) + Appel téléphonique             |
| 4. Communication avec un service externe      | API OpenStreetMap / Nominatim pour recherche d’adresse |
| 5. Code documenté & clair                     | Services, modèles, pages structurées + commentaires    |
| 6. Livrables complets                         | Code source + README + captures + APK                  |

---

## 🛠️ 3. Fonctionnalités principales

### ✔️ 1. Consultation des lieux

* Liste des lieux enregistrés (nom, catégorie, adresse, GPS)
* Détail complet d’un lieu : description, téléphone, localisation
* Appel téléphonique direct depuis la fiche du lieu

### ✔️ 2. Ajout de nouveaux lieux

* Nom du lieu
* Catégorie (hôpital, police, bibliothèque, wifi, etc.)
* Adresse
* Téléphone (optionnel)
* Coordonnées GPS :

  * Récupération automatique via GPS
  * OU recherche via API OpenStreetMap

### ✔️ 3. Carte interactive (optionnelle)

* Affichage des lieux sur une carte Leaflet
* Position actuelle de l’utilisateur

### ✔️ 4. Stockage local

Utilisation de `@ionic/storage-angular` → données enregistrées sur l’appareil :

* Pas de base de données payante
* Fonctionne hors-ligne

---

## 🧱 4. Architecture du projet

```
safeplaces/
│
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── place.ts
│   │   ├── services/
│   │   │   ├── place.service.ts
│   │   │   ├── storage.service.ts
│   │   │   ├── location.service.ts
│   │   │   └── geocoding.service.ts
│   │   ├── pages/
│   │   │   ├── list/
│   │   │   ├── map/
│   │   │   ├── about/
│   │   │   ├── place-add/
│   │   │   └── place-detail/
│   │   ├── tabs/
│   │   └── app.routes.ts
│   └── index.html
│
├── android/  (plateforme native Android)
├── capacitor.config.ts
├── package.json
└── README.md
```

---

## 🧩 5. Modèle de données

```ts
export type PlaceCategory =
  'hopital' | 'police' | 'bibliotheque' | 'wifi' | 'autre';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  address: string;
  phone?: string;
  lat: number;
  lng: number;
  note?: string;
  createdAt: number;
}
```

---

## 🌐 6. API externe (OpenStreetMap / Nominatim)

Service utilisé pour la recherche d’adresses :

```
GET https://nominatim.openstreetmap.org/search?format=json&q=<texte>
```

Exemples d’usage :

* Recherche : “Hôpital Yaoundé”
* Récupération : latitude/longitude issues de l’API
* Proposition de plusieurs résultats à l’utilisateur

➡️ API totalement **gratuite**, **sans authentification**, **sans carte bancaire**.

---

## 📍 7. Fonctionnalités natives utilisées

### 📌 GPS – Récupération de la position

Via plugin Capacitor :

```ts
import { Geolocation } from '@capacitor/geolocation';
const coords = await Geolocation.getCurrentPosition();
```

### 📌 Appel téléphonique

Sans plugin :

```html
<a [href]="'tel:' + place.phone">
  <ion-button>Appeler</ion-button>
</a>
```

---

## 🧭 8. Navigation (Routes)

Onglets :

* `/tabs/map` – Carte des lieux
* `/tabs/list` – Liste des lieux
* `/tabs/about` – À propos

Autres pages :

* `/places/add` – Ajouter un lieu
* `/places/:id` – Détail d’un lieu

---

## 🚀 9. Installation & exécution

### 9.1. Cloner le projet

```bash
git clone https://github.com/dnkoa/safeplaces.git
cd safeplaces
```

### 9.2. Installer les dépendances

```bash
npm install
```

### 9.3. Lancer en mode navigateur (démo)

```bash
ionic serve
```

---

## 📱 10. Build Android

### 10.1. Générer les fichiers Android

```bash
ionic build
ionic capacitor copy android
ionic capacitor open android
```

### 10.2. Dans Android Studio

* Choisir un téléphone ou émulateur
* Lancer ▶ (Run)
* Tester l’application

### 10.3. Générer un APK

Android Studio →
**Build → Generate Signed Bundle / APK → APK**

APK disponible dans :

```
android/app/release/
```

---

## 🧪 11. Scénarios de test

| Test                        | Attendu                              |
| --------------------------- | ------------------------------------ |
| Ajouter un lieu             | Le lieu apparaît dans la liste       |
| Récupérer position actuelle | GPS renvoie lat/lng                  |
| Recherche adresse (API)     | Affiche des suggestions              |
| Détail du lieu              | Données correctes + bouton “Appeler” |
| Appel tel                   | Ouvre l’application téléphone        |
| Onglet Carte                | Affiche les lieux et/ou la position  |
| Données en hors-ligne       | Les lieux restent disponibles        |

---

## 📄 12. Limitations & pistes d’amélioration

### Limitations

* Pas de synchronisation cloud (stockage local uniquement)
* API OSM peut limiter les requêtes si trop fréquentes
* Carte Leaflet non obligatoire dans la version minimale

### Améliorations futures

* Synchronisation via Firebase / Supabase (si ressources disponibles)
* Catégories personnalisables
* Filtrage et recherche avancée
* Mode sombre
* Export des lieux (JSON/PDF)

---

## 👤 13. Auteur

* **Nom :** *[Nkoa Dominique]*
* **Année :** 2025
* **Projet académique / personnel :** SafePlaces
* **Technologies maîtrisées :** Ionic, Angular, Capacitor, APIs Web
* **Contact :** *[nkoa.dominik@gmail.com]*

---

## 📦 14. Licence

Ce projet peut être utilisé librement à des fins **pédagogiques** ou **personnelles**.
Toute utilisation commerciale nécessite une autorisation préalable.

---
