import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ projects }) {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {projects
  .filter(p => p && typeof p.latitude === 'number' && typeof p.longitude === 'number')
  .map((p, idx) => (
    <Marker key={idx} position={[p.latitude, p.longitude]}>
      <Popup>
        <strong>{p.name}</strong><br />
        {p.price}<br />
        {p.builder}
      </Popup>
    </Marker>
))}

    </MapContainer>
  );
}
