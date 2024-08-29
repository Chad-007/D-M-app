import cv2
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the face detector and recognizer
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trained_model.yml')

def detect_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    return faces

@app.route('/recognize', methods=['POST'])
def recognize_face():
    file = request.files['image']
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    faces = detect_face(img)
    response = []

    if len(faces) > 0:
        for (x, y, w, h) in faces:
            roi_gray = cv2.cvtColor(img[y:y+h, x:x+w], cv2.COLOR_BGR2GRAY)
            label, confidence = recognizer.predict(roi_gray)
            response.append({
                'label': label,
                'confidence': confidence,
                'box': (x, y, w, h)
            })
        return jsonify(response)
    return jsonify({'message': 'No face detected'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
