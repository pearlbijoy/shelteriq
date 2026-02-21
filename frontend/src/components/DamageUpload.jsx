import { useState } from "react";

const locations = [
  { name: "Whitefield", lat: 12.9698, lng: 77.7500 },
  { name: "Yelahanka", lat: 13.1007, lng: 77.5963 },
  { name: "Hebbal", lat: 13.0359, lng: 77.5970 },
  { name: "Electronic City", lat: 12.8399, lng: 77.6770 },
  { name: "Koramangala", lat: 12.9279, lng: 77.6271 },
  { name: "Marathahalli", lat: 12.9591, lng: 77.6974 },
];

const badgeColor = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
};

function DamageUpload({ onNewAssessment }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(locations[0].name);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const selectedLocation = locations.find(l => l.name === location);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("location_name", selectedLocation.name);
    formData.append("lat", selectedLocation.lat);
    formData.append("lng", selectedLocation.lng);

    try {
      const response = await fetch("http://localhost:8000/api/damage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
      if (onNewAssessment) onNewAssessment(data);
    } catch (err) {
      alert("Could not connect to backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 flex flex-col gap-4">
      <h3 className="font-semibold text-white">Upload Damage Photo</h3>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none"
      >
        {locations.map((l) => (
          <option key={l.name} value={l.name}>{l.name}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="text-sm text-slate-400"
      />

      {preview && (
        <img src={preview} alt="preview" className="rounded-lg max-h-40 object-cover" />
      )}

      {result && (
        <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-3">
          <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${badgeColor[result.severity]}`}>
            {result.severity}
          </span>
          <span className="text-slate-300 text-sm">Confidence: {result.confidence}%</span>
          <span className="text-slate-500 text-xs">{result.location_name}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition"
      >
        {loading ? "Analysing..." : "Submit for Assessment"}
      </button>
    </div>
  );
}

export default DamageUpload;