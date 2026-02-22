import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

function LandingPage({ onEnter, liveData }) {
  // Heatmap Data Points (Alpha, Beta, Gamma coordinates)
  // We'll give Alpha a higher 'intensity' based on your live count
  const heatPoints = [
    [12.9763, 77.5929, liveData.count * 2], // Alpha (Koramangala area)
    [12.9507, 77.5848, 50],                // Beta
    [12.9716, 77.5946, 30],                // Gamma
  ];

  return (
    <div className="relative h-screen w-screen bg-[#020617] overflow-hidden">
      {/* Background Immersive Heatmap */}
      <div className="absolute inset-0 z-0 opacity-80">
        <MapContainer 
          center={[12.9716, 77.5946]} 
          zoom={12} 
          zoomControl={false} 
          dragging={true}
          style={{height: "100%", width: "100%"}}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          
          <HeatmapLayer
            points={heatPoints}
            longitudeExtractor={(m) => m[1]}
            latitudeExtractor={(m) => m[0]}
            intensityExtractor={(m) => m[2]}
            radius={40}
            blur={25}
            // Custom Gradient: Purple -> Pink -> Orange -> Yellow
            gradient={{ 0.4: '#a855f7', 0.6: '#f472b6', 0.8: '#f97316', 1.0: '#facc15' }}
          />
        </MapContainer>
      </div>

      {/* Floating Title Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <h1 
          onClick={onEnter}
          className="levitate text-9xl font-[900] tracking-tighter cursor-pointer select-none pointer-events-auto text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          SHELTERIQ
        </h1>
        <p className="text-white/40 font-bold tracking-[0.8em] uppercase text-xs mt-6 animate-pulse">
          TAP TO INITIALIZE TACTICAL INTERFACE
        </p>
      </div>
    </div>
  );
}

export default LandingPage;