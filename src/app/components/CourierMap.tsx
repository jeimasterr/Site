import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
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
  html: `<svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_6975_3777)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.3379 46.8513C21.9728 47.9579 23.7865 49.0131 24.9337 50.4094C26.0809 51.8063 26.5595 53.5459 26.9598 55.8678C27.3592 58.1897 27.68 61.0948 27.9997 64C28.3194 61.0948 28.6402 58.1897 29.0396 55.8678C29.4401 53.5459 29.9191 51.8063 31.0657 50.4094C32.2129 49.0124 34.0266 47.9573 35.6615 46.8513C37.2964 45.7448 38.7524 44.5867 40.2064 43.4293C44.9475 39.8135 48 34.1435 48 27.768C48 16.8501 39.0457 8 28 8C16.9543 8 8 16.8504 8 27.768C8 34.1439 11.0525 39.8139 15.7936 43.428C17.248 44.5876 18.704 45.745 20.3385 46.8516L20.3379 46.8513Z" fill="#FFCC00"/>
</g>
<circle cx="28" cy="28" r="15" fill="white"/>
<g clip-path="url(#clip0_6975_3777)">
<path d="M23.9161 31.3592L33.5703 27.8691C33.5561 26.6226 33.1061 25.4796 32.3671 24.5859L22.7129 28.0714C22.7271 29.3178 23.1771 30.4655 23.9161 31.3592Z" fill="url(#paint0_linear_6975_3777)"/>
<path d="M28.0714 37.9995C31.6906 37.9995 34.8644 36.1039 36.6361 33.2582L32.4911 30.8828C31.5437 32.308 29.9189 33.2535 28.0667 33.2535C26.4182 33.2535 24.9449 32.5056 23.9738 31.3297L19.3457 32.9995C19.3789 33.0512 19.4073 33.1076 19.4357 33.1594C21.2074 36.0616 24.4097 37.9995 28.0714 37.9995Z" fill="url(#paint1_linear_6975_3777)"/>
<path d="M28.0711 18C22.5097 18 18 22.4779 18 28C18 29.7168 18.4263 31.3114 19.1937 32.7225L19.4732 33.2117L24.1203 31.4995L23.8314 31.1327C23.1729 30.2578 22.7845 29.1759 22.7845 28C22.7845 25.0978 25.153 22.746 28.0758 22.746C30.9796 22.746 33.334 25.0649 33.3671 27.9436L38 26.2785C37.171 21.5748 33.0403 18 28.0711 18Z" fill="#C0E70A"/>
</g>
<defs>
<filter id="filter0_d_6975_3777" x="0" y="0" width="64" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4" dy="4"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6975_3777"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6975_3777" result="shape"/>
</filter>
<linearGradient id="paint0_linear_6975_3777" x1="21.4249" y1="30.6648" x2="30.3491" y2="27.0368" gradientUnits="userSpaceOnUse">
<stop stop-color="#C0E709" stop-opacity="0.2"/>
<stop offset="1" stop-color="#C0E709"/>
</linearGradient>
<linearGradient id="paint1_linear_6975_3777" x1="31.7971" y1="29.224" x2="27.05" y2="34.3493" gradientUnits="userSpaceOnUse">
<stop stop-color="#C0E709" stop-opacity="0.25"/>
<stop offset="1" stop-color="#C0E709"/>
</linearGradient>
<clipPath id="clip0_6975_3777">
<rect width="20" height="20" fill="white" transform="translate(18 18)"/>
</clipPath>
</defs>
</svg>
`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

// Иконка точки доставки — зелёный пин
const destinationIcon = L.divIcon({
  className: "custom-marker",
  html: `<svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_6975_3781)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.3379 46.8513C21.9728 47.9579 23.7865 49.0131 24.9337 50.4094C26.0809 51.8063 26.5595 53.5459 26.9598 55.8678C27.3592 58.1897 27.68 61.0948 27.9997 64C28.3194 61.0948 28.6402 58.1897 29.0396 55.8678C29.4401 53.5459 29.9191 51.8063 31.0657 50.4094C32.2129 49.0124 34.0266 47.9573 35.6615 46.8513C37.2964 45.7448 38.7524 44.5867 40.2064 43.4293C44.9475 39.8135 48 34.1435 48 27.768C48 16.8501 39.0457 8 28 8C16.9543 8 8 16.8504 8 27.768C8 34.1439 11.0525 39.8139 15.7936 43.428C17.248 44.5876 18.704 45.745 20.3385 46.8516L20.3379 46.8513Z" fill="#FFCC00"/>
</g>
<circle cx="28" cy="28" r="15" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.3617 18.1386L37.7983 26.3858C37.9819 26.546 38.0462 26.7996 37.9661 27.0308H37.9653C37.8834 27.2645 37.6697 27.4178 37.4368 27.4178H35.5309V35.4148C35.5309 35.7385 35.2772 36 34.9666 36H21.0346C20.8785 36 20.7374 35.9342 20.6356 35.8286L20.6364 35.8277C20.5337 35.7212 20.4703 35.5749 20.4703 35.4147L20.4694 27.4178H18.5636C18.3298 27.4178 18.1169 27.2645 18.0351 27.0308H18.0343C17.9533 26.7996 18.0184 26.546 18.2021 26.3858L27.6378 18.1404L27.637 18.1395C27.849 17.9542 28.1512 17.9534 28.3624 18.1378V18.1386L28.3617 18.1386ZM25.636 28.6939H30.3635C30.6156 28.6939 30.7525 28.8644 30.76 28.8644C30.8619 28.9701 30.9245 29.1155 30.9245 29.2765V34.9368H34.5042L34.505 26.3536H36.1779L28.0001 19.2069L19.8222 26.3536H21.4952V34.9368H25.0748V29.2757C25.0748 28.9545 25.3263 28.6939 25.636 28.6939ZM29.9002 29.7579H26.101V34.9239H29.9002V29.7579Z" fill="#FFCC00"/>
<defs>
<filter id="filter0_d_6975_3781" x="0" y="0" width="64" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4" dy="4"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6975_3781"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6975_3781" result="shape"/>
</filter>
</defs>
</svg>
`,
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

function MapClickHandler({
  onMapInteraction,
}: {
  onMapInteraction?: () => void;
}) {
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

function CenterMapButton({
  courierPosition,
}: {
  courierPosition: LatLng;
}) {
  const map = useMap();
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    map.fitBounds(
      L.latLngBounds([courierPosition, DESTINATION]),
      {
        padding: [50, 50],
        maxZoom: 16,
      },
    );
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute bottom-3 right-3 z-[1000] flex h-20 w-20 items-center justify-center rounded-full transition-colors hover:opacity-90 active:opacity-80 sm:h-24 sm:w-24"
      style={{ fontFamily: "var(--font-inter)" }}
      aria-label="Центрировать между курьером и точкой доставки"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 82 82"
        className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)] sm:h-24 sm:w-24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#centerBtnShadow)">
          <circle cx="41" cy="41" r="21" fill="white" />
          <circle cx="41" cy="41" r="20.5" stroke="#FFCC00" />
        </g>
        <path
          d="M42.0762 51.7119L38.375 43.3457L38.2207 42.9941L37.8701 42.8379L29.2354 38.9639L47.7578 33.2412L42.0762 51.7119Z"
          stroke="#FFCC00"
          strokeWidth="2"
        />
        <defs>
          <filter
            id="centerBtnShadow"
            x="0"
            y="0"
            width="82"
            height="82"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
  );
}

function interpolate(
  route: LatLng[],
  progress: number,
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
      if (animRef.current != null)
        cancelAnimationFrame(animRef.current);
    };
  }, [route.length]);

  const courierPosition =
    route.length > 0
      ? interpolate(route, courierProgress)
      : RESTAURANT;
  const boundsPositions =
    route.length >= 2 ? route : [RESTAURANT, DESTINATION];

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
        <Marker
          position={courierPosition}
          icon={courierIcon}
          zIndexOffset={500}
        />
      </MapContainer>
    </div>
  );
}