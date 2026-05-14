import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from "react-leaflet";
import L from "leaflet";
import { ReactNode } from "react";

// Fix default icon issue with bundlers
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error - prototype access
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

export const FIANA_CENTER: [number, number] = [-21.4545, 47.0833];

export function makeColorIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;">●</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function busIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};color:white;padding:4px 8px;border-radius:8px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-weight:600;font-size:11px;white-space:nowrap;">🚌 ${label}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });
}

export function stopIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:white;border:3px solid ${color};width:14px;height:14px;border-radius:50%;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

interface FianaMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  children?: ReactNode;
}

export function FianaMap({ center = FIANA_CENTER, zoom = 14, className = "h-full w-full", children }: FianaMapProps) {
  return (
    <MapContainer center={center} zoom={zoom} className={className} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

export { Marker, Popup, CircleMarker, Polyline };