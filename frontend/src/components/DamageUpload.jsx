import { useState } from "react";

const locations = [
  "Anna Nagar",
  "T Nagar",
  "Velachery",
  "Adyar",
  "Tambaram",
];

function DamageUpload() {
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState(locations[0]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
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
          <option key={l}>{l}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="text-sm text-slate-400"
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="rounded-lg max-h-40 object-cover"
        />
      )}

      <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg transition">
        Submit for Assessment
      </button>
    </div>
  );
}

export default DamageUpload;