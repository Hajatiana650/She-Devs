# 📊 Intégration Admin Dashboard - Guide Complet

## 🎯 Vue d'ensemble

L'intégration complète du **Dashboard Admin** (gestion des buses) entre le backend NestJS et le frontend React est maintenant opérationnelle.

---

## 🏗️ Architecture

### **Backend (NestJS)**

#### Module Admin - Dashboard Bus
- **Contrôleur**: `src/modules/admin/dashboard/dashboard-bus.controller.ts`
- **Service**: `src/modules/admin/dashboard/dashboard-bus.service.ts`
- **DTOs**: 
  - `dto/bus-dashboard.dto.ts` - Statistiques
  - `dto/bus-management-dashboard.dto.ts` - Gestion des buses

#### Endpoints API

1. **`GET /admin/dashboard/bus`** - Statistiques
   ```json
   {
     "statusCode": 200,
     "message": "Bus dashboard statistics retrieved successfully",
     "data": {
       "busEnregistres": 5,
       "busAptes": 4,
       "busInaptes": 1,
       "visitesARenouveler": 2
     }
   }
   ```

2. **`GET /admin/dashboard/bus/management?filter=all|apte|inapte|expiring`** - Gestion
   ```json
   {
     "statusCode": 200,
     "message": "Bus management dashboard retrieved successfully",
     "data": {
       "busRetires": 1,
       "buses": [
         {
           "matricule": "FNR-1024",
           "ligne": "L1",
           "chauffeur": "Rakoto Jean",
           "statut": "APTE",
           "derniereVisite": "12/03/2025",
           "expiration": "12/09/2026",
           "idBus": 1,
           "joursRestants": 120,
           "pourcentage": 95
         }
       ]
     }
   }
   ```

### **Frontend (React)**

#### Client API
- **Fichier**: `src/lib/api-client.ts`
- **Méthodes**:
  - `apiClient.admin.getBusDashboardStats()` - Récupère les statistiques
  - `apiClient.admin.getBusManagement(filter)` - Récupère la liste avec filtre

#### Page Admin
- **Route**: `/app/admin`
- **Fichier**: `src/routes/app.admin.tsx`
- **Composants**:
  - Statistiques (4 cartes: Buses, Aptes, Inaptes, Visites)
  - Filtres de gestion (all, apte, inapte, expiring)
  - Tableau/Cartes des buses (responsive)
  - Barre de progression (jours restants)

#### Navigation
- **Fichier**: `src/routes/app.tsx`
- **Logique**: Navigation adaptée au rôle:
  - **Citoyen**: Bus, Signaler, Campagnes, Profil
  - **Admin**: Dashboard, Bus, Profil

---

## 🚀 Démarrage

### 1. Backend
```bash
cd backend-she-devs
npm install
npm run dev
# API disponible à http://localhost:3000/api
```

### 2. Frontend
```bash
cd frontend
npm install

# Créer fichier .env.local si absent
echo "VITE_API_URL=http://localhost:3000/api" > .env.local

npm run dev
# Frontend à http://localhost:5173
```

### 3. Accéder au Dashboard
1. Aller à `http://localhost:5173/login`
2. Se connecter avec compte ADMIN
3. Cliquer sur "Dashboard" (icône graphique)
4. Accès à `/app/admin`

---

## 🎨 UI Composants

### 4 Cartes Statistiques
```tsx
<StatCard
  title="Buses Enregistrées"
  value={stats.busEnregistres}
  icon={Bus}
  color="bg-blue-50"
  borderColor="border-blue-200"
/>
```

### Filtres (Boutons)
```tsx
["all", "apte", "inapte", "expiring"].map(filter => (
  <Button 
    onClick={() => setFilter(filter)}
    variant={filter === current ? "default" : "outline"}
  />
))
```

### Tableau Desktop / Mobile
- **Desktop**: Tableau complet avec 7 colonnes
- **Mobile**: Cartes responsive avec infos clés
- **Animations**: Framer Motion pour transitions

### Indicateur Progression
```tsx
<div className="h-1.5 w-20 bg-muted overflow-hidden rounded-full">
  <motion.div
    className="h-full bg-emerald-500"
    animate={{ width: `${pourcentage}%` }}
  />
</div>
```

---

## 📡 Flux de Données

```
Frontend State
    ↓
[useEffect] → load dashboard
    ↓
[apiClient.admin.getBusDashboardStats()] 
    ↓
HTTP GET /admin/dashboard/bus
    ↓
Backend Service
    ↓
Query Prisma (count, relations)
    ↓
Format Response (DTO)
    ↓
HTTP 200 JSON
    ↓
Frontend setState
    ↓
UI Render
```

---

## 🔒 Sécurité

### Authentification
```tsx
const { role } = useAuth(); // ADMIN | CITIZEN | DRIVER
if (role !== "ADMIN") navigate("/"); // Redirection
```

### Token Authorization
```tsx
// Dans apiClient.ts
headers: {
  Authorization: `Bearer ${tokenManager.getToken()}`
}
```

### Navigation Protégée
- Dashboard visible seulement pour ADMIN
- Onglets différents selon le rôle

---

## 🎯 Filtres Gestion

| Filtre | Description | Query |
|--------|-------------|-------|
| **all** | Tous les buses (sauf retrés) | `bus_status: any` |
| **apte** | Buses opérationnels | `bus_status: true` |
| **inapte** | Buses hors service | `bus_status: false` |
| **expiring** | Expirant dans 30 jours | `joursRestants <= 30` |

---

## 📊 Statuts Affichage

### Couleurs Statut
- 🟢 **APTE** (vert): Opérationnel
- 🔴 **INAPTE** (rouge): Hors service

### Couleurs Progression
- 🟢 **> 30 jours**: Vert (émeraude)
- 🟡 **1-30 jours**: Ambre (orange)
- 🔴 **≤ 0 jours**: Rouge (expiré)

---

## 🔧 Variables d'Environnement

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

---

## 📱 Responsive

| Breakpoint | Comportement |
|------------|--------------|
| **Mobile** | Cartes empilées, 1 colonne |
| **Tablet** | 2 colonnes stats, tableau scroll |
| **Desktop** | Grille 4 colonnes, tableau complet |

---

## ⚡ Performance

- ✅ Lazy loading de données (useEffect)
- ✅ Animations Framer Motion (smooth)
- ✅ Pagination incluse (future)
- ✅ Erreurs gracieuses (fallback UI)
- ✅ Loading states (spinner)

---

## 🚨 Gestion Erreurs

```tsx
try {
  const data = await apiClient.admin.getBusDashboardStats();
  setStats(data.data);
} catch (err) {
  setError(err.message);
  // Affiche: "Erreur lors du chargement"
}
```

---

## 📝 Exemples Usage

### 1. Charger les statistiques
```tsx
const stats = await apiClient.admin.getBusDashboardStats();
console.log(stats.data.busEnregistres); // 5
```

### 2. Filtrer les buses
```tsx
const apta = await apiClient.admin.getBusManagement("apte");
console.log(apta.data.buses.length); // 4 buses aptes
```

### 3. Naviguer vers Admin
```tsx
<Link to="/app/admin">Dashboard Admin</Link>
```

---

## 🎓 Prochaines Étapes

- [ ] Ajouter filtrage par ligne (L1, L2, etc.)
- [ ] Export CSV des buses
- [ ] Planifier visites directement du dashboard
- [ ] Graphiques statistiques (Chart.js)
- [ ] Notifications pour buses expirant
- [ ] Actions rapides (marquer apte/inapte)

---

## 📚 Fichiers Clés

```
Backend:
├── src/modules/admin/
│   └── dashboard/
│       ├── dashboard-bus.controller.ts
│       ├── dashboard-bus.service.ts
│       └── dto/
│           ├── bus-dashboard.dto.ts
│           └── bus-management-dashboard.dto.ts

Frontend:
├── src/lib/
│   └── api-client.ts (+ admin methods)
├── src/routes/
│   ├── app.tsx (navigation admin)
│   └── app.admin.tsx (dashboard page)
├── .env.example
└── .env.local
```

---

**✅ Intégration complète et opérationnelle!**
