import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import type { ReactNode } from "react";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

export const FIANA_CENTER: [number, number] = [-21.4545, 47.0833];

export function busIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};color:white;padding:4px 8px;border-radius:8px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:600;font-size:11px;white-space:nowrap;">🚌 ${label}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });
}

interface FianaMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  children?: ReactNode;
}

export function FianaMap({ center, zoom, className = "h-full w-full", children }: FianaMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

export { Marker };
