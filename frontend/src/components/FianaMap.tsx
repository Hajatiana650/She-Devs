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
  mapStyle?: "voyager" | "positron" | "stamen" | "osm";
}

const mapStyles = {
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastered/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  },
  positron: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  },
  stamen: {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
    maxZoom: 18,
  },
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
};

export function FianaMap({ center = FIANA_CENTER, zoom = 14, className = "", children, mapStyle = "voyager" }: FianaMapProps) {
  const style = mapStyles[mapStyle];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      whenReady={() => {
        // Force re-render after map is ready
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }}
    >
      {/* Sélectionner le style de carte */}
      <TileLayer
        attribution={style.attribution}
        url={style.url}
        maxZoom={style.maxZoom}
      />
      {children}
    </MapContainer>
  );
}

export { Marker, Popup, CircleMarker, Polyline };