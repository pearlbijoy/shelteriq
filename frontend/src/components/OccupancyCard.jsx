function OccupancyCard({ name, count, capacity, risk }) {
  const percent = Math.round((count / capacity) * 100);
  const glowClass = risk === "HIGH" ? "shadow-[0_0_20px_rgba(250,204,21,0.4)] border-yellow-500" : 
                    risk === "MEDIUM" ? "shadow-[0_0_20px_rgba(244,114,182,0.4)] border-pink-500" : 
                    "shadow-[0_0_20px_rgba(168,85,247,0.4)] border-purple-500";

  return (
    <div className={`bg-slate-900/50 rounded-2xl p-6 border-l-8 ${glowClass} transition-all duration-500`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Node Identity</h3>
          <p className="text-xl font-black text-white">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-bold text-white">{percent}%</p>
          <p className="text-[10px] text-slate-500 uppercase">Capacity</p>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent to-white transition-all duration-1000" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-4 text-[10px] text-slate-400 font-mono tracking-tighter">SIGNAL: {risk} // LOAD: {count} UNITS</p>
    </div>
  );
}
export default OccupancyCard;