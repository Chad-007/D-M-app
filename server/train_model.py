import cv2
import os
import numpy as np

# Initialize the face detector and recognizer
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Define paths
dataset_path = 'dataset'
faces = []
labels = []

# Load images from the dataset
for label, person_name in enumerate(os.listdir(dataset_path)):
    person_path = os.path.join(dataset_path, person_name)
    if os.path.isdir(person_path):
        for filename in os.listdir(person_path):
            image_path = os.path.join(person_path, filename)
            image = cv2.imread(image_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            faces_detected = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
            for (x, y, w, h) in faces_detected:
                roi_gray = gray[y:y+h, x:x+w]
                faces.append(roi_gray)
                labels.append(label)

# Convert lists to numpy arrays
faces_np = np.array(faces)
labels_np = np.array(labels)

# Train the recognizer
recognizer.train(faces_np, labels_np)

# Save the trained model
model_path = 'trained_model.yml'
recognizer.save(model_path)
print(f'Model saved to {model_path}')
