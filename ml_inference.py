#!/usr/bin/env python3
"""
BoviCare Local Inference Runner for Udder Health Screening
Loads converted MobileNetV2 mastitis screening model in ONNX Runtime.
"""
import sys
import os
import json
import numpy as np
from PIL import Image

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'asset', 'models', 'bovicare_mastitis_model.onnx')

def run_inference(image_path):
    if not os.path.exists(MODEL_PATH):
        return {"error": f"Model artifact not found at {MODEL_PATH}"}
    if not os.path.exists(image_path):
        return {"error": f"Input image not found at {image_path}"}

    try:
        import onnxruntime as ort
        session = ort.InferenceSession(MODEL_PATH, providers=['CPUExecutionProvider'])
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name

        # Preprocessing: 224x224 RGB, float32, NCHW [1, 3, 224, 224]
        # Built-in model layers handle (pixel / 127.5) - 1.0 normalization
        img = Image.open(image_path).convert('RGB').resize((224, 224), Image.Resampling.BILINEAR)
        arr = np.array(img, dtype=np.float32).transpose((2, 0, 1))[np.newaxis, :]

        raw_output = session.run([output_name], {input_name: arr})[0]
        score = float(raw_output[0][0])

        return {
            "success": True,
            "model_architecture": "MobileNetV2 (1.00_224)",
            "output_layer": "Dense(1) + Sigmoid",
            "raw_probability": round(score, 4),
            "input_resolution": [224, 224, 3],
            "verified_constraints": {
                "built_in_normalization": "((pixel / 127.5) - 1.0)",
                "framework": "TensorFlow Lite 2.21.0 -> ONNX Runtime",
                "label_provenance": "UNVERIFIED (Requires training author confirmation: 1=Mastitis vs 1=Healthy)"
            }
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python3 ml_inference.py <path_to_image>"}))
        sys.exit(1)
    
    res = run_inference(sys.argv[1])
    print(json.dumps(res, indent=2))
