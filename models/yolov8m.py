import cv2
import csv
from sahi import AutoDetectionModel
from sahi.predict import get_sliced_prediction

# 1. Setup Model
detection_model = AutoDetectionModel.from_pretrained(
    model_type='yolov8', 
    model_path='yolov8s.pt', 
    confidence_threshold=0.12, # Dropped slightly more to catch those tiny blurs
    device="cpu" 
)

cap = cv2.VideoCapture("23.mp4")
output_data = []

print("Starting Aggressive Processing... This will be slow but accurate.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break

    frame_no = int(cap.get(cv2.CAP_PROP_POS_FRAMES))
    if frame_no % 10 != 0: continue

    # COLOR FIX: Convert BGR to RGB so the AI sees colors correctly
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 2. AGGRESSIVE SLICING (The "Nuclear" magnifying glass)
    result = get_sliced_prediction(
        frame_rgb,            # Using the color-corrected frame
        detection_model,
        slice_height=256,      # Much smaller slices = higher zoom
        slice_width=256,
        overlap_height_ratio=0.4, # High overlap so people aren't missed on edges
        overlap_width_ratio=0.4,
        postprocess_type="NMM",   # Non-Maximum Merging for dense crowds
        postprocess_match_threshold=0.5,
        verbose=0
    )

    count = 0
    # --- DRAWING LOGIC ---
    for p in result.object_prediction_list:
        if p.category.name == 'person':
            count += 1
            bbox = p.bbox.to_xyxy() 
            x1, y1, x2, y2 = map(int, bbox)
            
            # Green box for detected people
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, "P", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 0), 1)

    # On-screen Counter
    cv2.putText(frame, f"Aggressive Count: {count}", (30, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
    
    # Show the video (this will update slowly!)
    cv2.imshow("AGGRESSIVE SAHI DETECTION", frame)
    
    output_data.append([frame_no, count])
    print(f"Frame {frame_no} | Count: {count}")

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Save to CSV
with open('shelter_data_aggressive.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(["frame", "count"])
    writer.writerows(output_data)

cap.release()
cv2.destroyAllWindows()
