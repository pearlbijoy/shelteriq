# 🚨 ShelterIQ — Disaster Response Intelligence Dashboard

A unified AI-powered command dashboard for disaster coordinators to monitor shelter occupancy and assess structural damage in real time — built at a hackathon in 48 hours.

> Built by a team of 3-Navya Dixit, Saisree Vaishnavi, Pearl Bijoy.

---

## The Problem

During disasters in India, district coordinators manage response over WhatsApp and manual headcounts. They have no real-time visibility into shelter capacity or where the worst damage is occurring.

**ShelterIQ gives them one screen with the full picture.**

---

## Two Modules, One Dashboard

###  Module 1 — Live Shelter Monitoring
- Real-time people counting from CCTV footage using **YOLOv8**
- Occupancy risk classification (LOW / MEDIUM / HIGH) based on capacity thresholds
- Auto-calculated resource needs (water, meals, blankets, medical kits, volunteers) with deficit alerts
- Estimated time-to-full based on current intake rate
- Shelter network map with color-coded risk markers and redirect recommendations
- Situation report auto-generated every 60 seconds
- Live authority alerts when thresholds are breached

###  Module 2 — Damage Assessment
- Photo upload interface for field teams 
- **MobileNetV2** classifies structural damage as LOW / MEDIUM / HIGH with confidence score
- Priority dispatch list ranked by damage severity
- Damage locations plotted on unified map alongside shelter markers

---

## Tech Stack

| Layer | Technology |
|---|---|
| People Detection | YOLOv8 |
| Damage Classification | MobileNetV2 (fine-tuned on Kaggle earthquake dataset) |
| Backend | Python, FastAPI |
| Frontend | React, Tailwind CSS, Recharts, Leaflet.js |
| Storage | In-memory (Python dicts) |

---

## Repo Structure
```
shelteriq/
├── backend/        # FastAPI server, YOLOv8 detection loop, image classifier
├── frontend/       # React app with Tailwind, Recharts, Leaflet
├── models/         # Trained MobileNetV2 weights (.pth)
├── videos/         # Sample CCTV footage for demo
└── README.md
```

---

## How to Run

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm start
```
