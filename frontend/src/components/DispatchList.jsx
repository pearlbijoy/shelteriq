function DispatchList() {
  const items = [
    { location: "Koramangala", severity: "HIGH", confidence: "94%", time: "14:28" },
    { location: "Whitefield", severity: "HIGH", confidence: "89%", time: "14:10" },
    { location: "Hebbal", severity: "MEDIUM", confidence: "76%", time: "13:45" },
];

  const badgeColor = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-red-500",
  };

  const textColor = {
    LOW: "text-green-400",
    MEDIUM: "text-yellow-400",
    HIGH: "text-red-400",
  };

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 flex flex-col gap-3">
      <h3 className="font-semibold text-white">Priority Dispatch List</h3>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${textColor[item.severity]}`}>#{i + 1}</span>
              <span className="text-white text-sm">{item.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs">{item.confidence}</span>
              <span className="text-slate-500 text-xs">{item.time}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${badgeColor[item.severity]}`}>
                {item.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DispatchList;