import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const shelters = [
  { name: "Shelter Alpha", count: 87, capacity: 100, risk: "HIGH", lat: 13.0827, lng: 80.2707 },
  { name: "Shelter Beta", count: 45, capacity: 120, risk: "LOW", lat: 13.0418, lng: 80.2341 },
  { name: "Shelter Gamma", count: 110, capacity: 110, risk: "HIGH", lat: 12.9815, lng: 80.2180 },
];

function ShelterMap() {
  return (
    <div className="bg-[#1e293b] rounded-xl p-5 flex flex-col gap-3">
      <h3 className="font-semibold text-white">Shelter Network Map</h3>
      <div style={{ height: "350px", width: "100%" }}>
        <MapContainer
          center={[13.0827, 80.2707]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {shelters.map((s) => (
            <Marker key={s.name} position={[s.lat, s.lng]}>
              <Popup>
                <strong>{s.name}</strong><br />
                {s.count} / {s.capacity}<br />
                {s.risk}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default ShelterMap;