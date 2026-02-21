import OccupancyCard from './components/OccupancyCard';
import ResourcePanel from './components/ResourcePanel';
import DamageUpload from './components/DamageUpload';
import ShelterMap from './components/ShelterMap';
import AlertFeed from './components/AlertFeed';
import SituationReport from './components/SituationReport';
import DispatchList from './components/DispatchList';
import { useState } from "react";
import DamageMap from './components/DamageMap';
function App() {
  const [damageMarkers, setDamageMarkers] = useState([]);

  const handleNewAssessment = (data) => {
  setDamageMarkers(prev => [...prev, data]);
};
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#1e293b] border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wide">ShelterIQ</h1>
        <span className="text-green-400 text-sm font-medium">● SYSTEM LIVE</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-4 p-4">
        
        {/* Left half — Shelter Monitoring */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-slate-400 text-xs uppercase tracking-widest">Shelter Monitoring</h2>
          <OccupancyCard name="Shelter Alpha" count={87} capacity={100} risk="HIGH" />
          <ResourcePanel count={87} />
          <AlertFeed />
          <SituationReport />
          <DamageMap markers={damageMarkers} />
        </div>

        {/* Right half — Damage Assessment */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-slate-400 text-xs uppercase tracking-widest">Damage Assessment</h2>
          <DamageUpload onNewAssessment={handleNewAssessment} />
          <DispatchList />
          <ShelterMap />
        </div>

      </div>
    </div>
  );
}

export default App;
