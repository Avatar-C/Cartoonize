from flask import Flask, request, jsonify, send_file
import os
import cv2
import numpy as np
import uuid
from io import BytesIO
from PIL import Image
from cartoonize import WB_Cartoonize  # assuming your class is in this module
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow all origins by default

#app = Flask(__name__)

# Load the model once when the app starts
cartoonizer = WB_Cartoonize('/home/ec2-user/White-box-Cartoonization/test_code/saved_models', gpu=True)

def read_image_from_request(request_file):
    file_bytes = np.asarray(bytearray(request_file.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

@app.route("/cartoonize", methods=["POST"])
def cartoonize_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    uploaded_file = request.files['image']
    input_image = read_image_from_request(uploaded_file)

    # Cartoonize the image
    cartoon_image = cartoonizer.infer(input_image)

    # Convert result to PIL image and send back as file
    pil_img = Image.fromarray(cartoon_image)
    buffer = BytesIO()
    pil_img.save(buffer, format="PNG")
    buffer.seek(0)

    return send_file(buffer, mimetype='image/png')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2000, debug=True)

