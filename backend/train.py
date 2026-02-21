import torch
import torchvision
from torchvision import datasets, transforms, models
import torch.nn as nn
import torch.optim as optim
import os

# Settings
DATA_DIR = "backend/dataset"
MODEL_SAVE_PATH = "models/model.pth"
NUM_EPOCHS = 15
BATCH_SIZE = 16
NUM_CLASSES = 3

# Image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Load images from dataset/low, dataset/medium, dataset/high
dataset = datasets.ImageFolder(DATA_DIR, transform=transform)
print(f"Classes found: {dataset.classes}")
print(f"Total images: {len(dataset)}")

dataloader = torch.utils.data.DataLoader(
    dataset, batch_size=BATCH_SIZE, shuffle=True
)

# Load pretrained MobileNetV2
model = models.mobilenet_v2(pretrained=True)

# Replace last layer with 3 outputs
model.classifier[1] = nn.Linear(
    model.last_channel, NUM_CLASSES
)

# Training setup
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Train
print("Starting training...")
model.train()
for epoch in range(NUM_EPOCHS):
    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in dataloader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    print(f"Epoch {epoch+1}/{NUM_EPOCHS} - Loss: {running_loss:.3f} - Accuracy: {accuracy:.1f}%")

# Save model
torch.save(model.state_dict(), MODEL_SAVE_PATH)
print(f"Model saved to {MODEL_SAVE_PATH}")
print("Training complete!")
