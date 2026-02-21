from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import transforms, models
import torch.nn as nn
from PIL import Image
import io
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load model once at startup
model = models.mobilenet_v2(pretrained=False)
model.classifier[1] = nn.Linear(model.last_channel, 3)

state = torch.load("model.pth", map_location="cpu")
model.load_state_dict(state)

model.eval()

# IMPORTANT: keep this order (matches your dataset folders)
classes = ["HIGH", "LOW", "MEDIUM"]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Store all damage assessments in memory
damage_assessments = []


@app.post("/api/damage")
async def classify_damage(
    file: UploadFile = File(...),
    location_name: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...)
):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.copy()   # prevents PIL crash

    tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(tensor)
        probabilities = torch.softmax(output, dim=1)
        predicted = torch.argmax(output, dim=1).item()
        confidence = probabilities[0][predicted].item() * 100

    severity = classes[predicted]

    result = {
        "id": len(damage_assessments) + 1,
        "location_name": location_name,
        "lat": lat,
        "lng": lng,
        "severity": severity,
        "confidence": round(confidence, 1),
        "timestamp": datetime.now().strftime("%H:%M %d %b")
    }

    damage_assessments.append(result)
    return result


@app.get("/api/damage/all")
def get_all_damage():
    priority = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
    return sorted(damage_assessments, key=lambda x: priority.get(x["severity"], 3))


@app.get("/api/locations")
def get_locations():
    from locations import damage_locations
    return damage_locations