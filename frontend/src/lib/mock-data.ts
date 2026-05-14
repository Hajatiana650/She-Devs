// Mock data for FianaCity
// Fianarantsoa center: -21.4545, 47.0833

export const FIANA_CENTER: [number, number] = [-21.4545, 47.0833];

export const QUARTIERS = [
  "Ankofafa", "Tanambao", "Isaha", "Antarandolo", "Ambalakisoa",
  "Kianjasoa", "Andrainjato", "Tsianolondroa", "Ambatomena", "Mahamanina",
];

export type BusStatus = "EN SERVICE" | "EN RETARD" | "COMPLET" | "INAPTE";
export type BusFitness = "APTE" | "INAPTE";

export interface BusLine {
  id: string;
  number: string;
  name: string;
  color: string;
  stops: { name: string; coords: [number, number] }[];
}

export const BUS_LINES: BusLine[] = [
  {
    id: "L1",
    number: "1",
    name: "Centre - Ankofafa",
    color: "#185FA5",
    stops: [
      { name: "Place du Marché", coords: [-21.4525, 47.0855] },
      { name: "Ankofafa", coords: [-21.4480, 47.0890] },
      { name: "Ambatomena", coords: [-21.4445, 47.0925] },
      { name: "Antarandolo", coords: [-21.4410, 47.0960] },
    ],
  },
  {
    id: "L2",
    number: "2",
    name: "Isaha - Tanambao",
    color: "#378ADD",
    stops: [
      { name: "Isaha", coords: [-21.4600, 47.0780] },
      { name: "Kianjasoa", coords: [-21.4570, 47.0810] },
      { name: "Centre Ville", coords: [-21.4545, 47.0833] },
      { name: "Tanambao", coords: [-21.4500, 47.0870] },
    ],
  },
  {
    id: "L3",
    number: "3",
    name: "Andrainjato - Tanambao",
    color: "#1D9E75",
    stops: [
      { name: "Andrainjato", coords: [-21.4660, 47.0900] },
      { name: "Tsianolondroa", coords: [-21.4620, 47.0870] },
      { name: "Mahamanina", coords: [-21.4570, 47.0850] },
      { name: "Tanambao", coords: [-21.4500, 47.0870] },
    ],
  },
];

export interface Bus {
  id: string;
  matricule: string;
  ligneId: string;
  chauffeur: string;
  status: BusStatus;
  fitness: BusFitness;
  lastVisit: string;
  expirationDate: string;
  occupancy: number; // 0-100
  position: [number, number];
}

export const BUSES: Bus[] = [
  { id: "b1", matricule: "TAA-101-FNR", ligneId: "L1", chauffeur: "Rakoto Jean", status: "EN SERVICE", fitness: "APTE", lastVisit: "2025-03-12", expirationDate: "2026-03-12", occupancy: 45, position: [-21.4480, 47.0890] },
  { id: "b2", matricule: "TAA-204-FNR", ligneId: "L1", chauffeur: "Rasoa Marie", status: "EN RETARD", fitness: "APTE", lastVisit: "2025-01-20", expirationDate: "2025-12-20", occupancy: 80, position: [-21.4445, 47.0925] },
  { id: "b3", matricule: "TAA-309-FNR", ligneId: "L2", chauffeur: "Andry Patrick", status: "EN SERVICE", fitness: "APTE", lastVisit: "2025-04-05", expirationDate: "2026-04-05", occupancy: 30, position: [-21.4570, 47.0810] },
  { id: "b4", matricule: "TAA-412-FNR", ligneId: "L2", chauffeur: "Hery Naina", status: "COMPLET", fitness: "APTE", lastVisit: "2025-02-15", expirationDate: "2026-02-15", occupancy: 95, position: [-21.4545, 47.0833] },
  { id: "b5", matricule: "TAA-518-FNR", ligneId: "L3", chauffeur: "Tiana Rabe", status: "INAPTE", fitness: "INAPTE", lastVisit: "2024-11-08", expirationDate: "2025-05-08", occupancy: 0, position: [-21.4620, 47.0870] },
  { id: "b6", matricule: "TAA-622-FNR", ligneId: "L3", chauffeur: "Soa Lalaina", status: "EN SERVICE", fitness: "APTE", lastVisit: "2025-05-01", expirationDate: "2026-05-01", occupancy: 55, position: [-21.4570, 47.0850] },
];

export type SignalStatus = "EN ATTENTE" | "PRIS EN COMPTE" | "TRAITÉ";
export type SignalPriority = "HAUTE" | "NORMALE" | "BASSE";

export interface Signal {
  id: string;
  quartier: string;
  reportedBy: string;
  date: string;
  description: string;
  priority: SignalPriority;
  status: SignalStatus;
  photo: string;
  coords: [number, number];
}

export const SIGNALS: Signal[] = [
  { id: "s1", quartier: "Ankofafa", reportedBy: "Hanitra R.", date: "2026-05-10", description: "Tas de déchets près de l'école primaire", priority: "HAUTE", status: "EN ATTENTE", photo: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=200", coords: [-21.4480, 47.0890] },
  { id: "s2", quartier: "Tanambao", reportedBy: "Jean P.", date: "2026-05-08", description: "Décharge sauvage rue principale", priority: "NORMALE", status: "PRIS EN COMPTE", photo: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200", coords: [-21.4500, 47.0870] },
  { id: "s3", quartier: "Isaha", reportedBy: "Marie L.", date: "2026-05-12", description: "Ordures non collectées depuis 5 jours", priority: "NORMALE", status: "EN ATTENTE", photo: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=200", coords: [-21.4600, 47.0780] },
  { id: "s4", quartier: "Kianjasoa", reportedBy: "Paul R.", date: "2026-05-05", description: "Collecte effectuée, propre", priority: "BASSE", status: "TRAITÉ", photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200", coords: [-21.4570, 47.0810] },
  { id: "s5", quartier: "Antarandolo", reportedBy: "Soa H.", date: "2026-05-13", description: "Près de l'hôpital, urgent", priority: "HAUTE", status: "EN ATTENTE", photo: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=200", coords: [-21.4410, 47.0960] },
];

export interface Campaign {
  id: string;
  title: string;
  quartiers: string[];
  date: string;
  message: string;
  participants: number;
}

export const CAMPAIGNS: Campaign[] = [
  { id: "c1", title: "Grand nettoyage du marché", quartiers: ["Ankofafa", "Tanambao"], date: "2026-05-25T08:00", message: "Rejoignez-nous pour nettoyer le quartier du marché central. Sacs et gants fournis.", participants: 23 },
  { id: "c2", title: "Opération berges propres", quartiers: ["Isaha"], date: "2026-06-01T07:30", message: "Action collective le long de la rivière. Apportez de l'eau.", participants: 41 },
];

export const CURRENT_USER = {
  name: "Hanitra Razafy",
  email: "hanitra@example.mg",
  avatar: "https://images.unsplash.com/photo-1603415526960-f8f6e4ee1b2a?auto=format&fit=crop&w=200&q=80",
  image: "https://images.unsplash.com/photo-1603415526960-f8f6e4ee1b2a?auto=format&fit=crop&w=400&q=80",
};
