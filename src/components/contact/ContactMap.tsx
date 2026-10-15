import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SITE } from "../../config/site";

// Brand-red map pin (inline SVG, so no image asset or React server renderer is needed).
const markerIcon = L.divIcon({
	html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#d91e26" aria-hidden="true"><path d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9zm0 12.5A3.5 3.5 0 1 1 12 5.5a3.5 3.5 0 0 1 0 7z"/></svg>`,
	iconSize: [30, 30],
	iconAnchor: [15, 30],
	className: "bg-transparent",
});

/** OpenStreetMap view of the office. Loaded lazily — Leaflet is browser-only and heavy. */
export default function ContactMap() {
	const position: [number, number] = [SITE.geo.lat, SITE.geo.lng];
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={false} className="size-full">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position} icon={markerIcon}>
				<Popup>
					Act of Love Empowerment Foundation <br /> Bunamwaya, Wakiso.
					{position[0]}, {position[1]}
				</Popup>
			</Marker>
		</MapContainer>
	);
}
