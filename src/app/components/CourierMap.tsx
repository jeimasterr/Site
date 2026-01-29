import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
import { Crosshair } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "./leaflet-overrides.css";

// Координаты: ресторан (старт) и адрес доставки (пр. Металлургов, 32 — условно Самара)
const RESTAURANT: [number, number] = [53.1959, 50.098];
const DESTINATION: [number, number] = [53.208, 50.118];

const CENTER: [number, number] = [
  (RESTAURANT[0] + DESTINATION[0]) / 2,
  (RESTAURANT[1] + DESTINATION[1]) / 2,
];

type LatLng = [number, number];

// Иконка ресторана (Evo) — жёлтый круг с буквой E
const restaurantIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:44px;height:44px;border-radius:50%;background:#ffcc00;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;font-weight:bold;color:#191919;font-size:14px;font-family:Inter,sans-serif">E</div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

// Иконка точки доставки — зелёный пин
const destinationIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:40px;height:40px;"><svg viewBox="0 0 24 24" fill="#00af54" style="width:100%;height:100%;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Иконка курьера — жёлтый круг с белой обводкой
const courierIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:36px;height:36px;border-radius:50%;background:#ffcc00;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.35);"></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

function FitBounds({ positions }: { positions: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length < 2) return;
    map.fitBounds(L.latLngBounds(positions), {
      padding: [50, 50],
      maxZoom: 16,
    });
  }, [map, positions]);
  return null;
}

function MapClickHandler({ onMapInteraction }: { onMapInteraction?: () => void }) {
  const map = useMap();
  useEffect(() => {
    if (!onMapInteraction) return;
    map.on("click", onMapInteraction);
    return () => {
      map.off("click", onMapInteraction);
    };
  }, [map, onMapInteraction]);
  return null;
}

function CenterMapButton({ courierPosition }: { courierPosition: LatLng }) {
  const map = useMap();
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    map.fitBounds(L.latLngBounds([courierPosition, DESTINATION]), {
      padding: [50, 50],
      maxZoom: 16,
    });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute bottom-3 right-3 z-[1000] w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors border border-[#e2e2e8]"
      style={{ fontFamily: "var(--font-inter)" }}
      aria-label="Центрировать между курьером и точкой доставки"
    >
      <Crosshair className="w-5 h-5 text-[#191919]" />
    </button>
  );
}

function interpolate(
  route: LatLng[],
  progress: number
): LatLng {
  if (route.length === 0) return RESTAURANT;
  if (route.length === 1) return route[0];
  const i = progress * (route.length - 1);
  const i0 = Math.floor(i);
  const i1 = Math.min(i0 + 1, route.length - 1);
  const t = i - i0;
  return [
    route[i0][0] + t * (route[i1][0] - route[i0][0]),
    route[i0][1] + t * (route[i1][1] - route[i0][1]),
  ];
}

interface CourierMapProps {
  isPanelExpanded?: boolean;
  onMapInteraction?: () => void;
}

export function CourierMap({
  onMapInteraction,
}: CourierMapProps) {
  const [route, setRoute] = useState<LatLng[]>([]);
  const [courierProgress, setCourierProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  // Загрузка маршрута по дорогам (OSRM)
  useEffect(() => {
    const lon1 = RESTAURANT[1];
    const lat1 = RESTAURANT[0];
    const lon2 = DESTINATION[1];
    const lat2 = DESTINATION[0];
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const coords = data?.routes?.[0]?.geometry?.coordinates;
        if (Array.isArray(coords) && coords.length > 0) {
          // GeoJSON: [lon, lat] -> Leaflet [lat, lon]
          setRoute(coords.map((c: number[]) => [c[1], c[0]]));
        } else {
          // Fallback: путь по прямой с одной промежуточной точкой
          setRoute([
            RESTAURANT,
            [
              (RESTAURANT[0] + DESTINATION[0]) / 2,
              (RESTAURANT[1] + DESTINATION[1]) / 2,
            ],
            DESTINATION,
          ]);
        }
      })
      .catch(() => {
        setRoute([RESTAURANT, DESTINATION]);
      });
  }, []);

  // Анимация движения курьера по маршруту (цикл ~50 сек), только после загрузки маршрута
  useEffect(() => {
    if (route.length === 0) return;
    const duration = 50000; // мс на полный путь
    startRef.current = 0;

    const tick = (now: number) => {
      if (startRef.current === 0) startRef.current = now;
      const elapsed = now - startRef.current;
      let p = elapsed / duration;
      if (p >= 1) {
        p = 0;
        startRef.current = now;
      }
      setCourierProgress(p);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current != null) cancelAnimationFrame(animRef.current);
    };
  }, [route.length]);

  const courierPosition = route.length > 0 ? interpolate(route, courierProgress) : RESTAURANT;
  const boundsPositions = route.length >= 2 ? route : [RESTAURANT, DESTINATION];

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: 200 }}
    >
      <MapContainer
        center={CENTER}
        zoom={14}
        className="w-full h-full"
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitBounds positions={boundsPositions} />
        <MapClickHandler onMapInteraction={onMapInteraction} />
        <CenterMapButton courierPosition={courierPosition} />

        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: "#2563eb",
              weight: 5,
              opacity: 0.9,
              lineJoin: "round",
              lineCap: "round",
            }}
          />
        )}

        <Marker position={RESTAURANT} icon={restaurantIcon} />
        <Marker position={DESTINATION} icon={destinationIcon} />
        <Marker position={courierPosition} icon={courierIcon} zIndexOffset={500} />
      </MapContainer>
    </div>
  );
}
