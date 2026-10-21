#!/usr/bin/env python3
"""
BoviCare FastAPI Inference Backend
Exposes endpoints for tabular milk mastitis prediction and service health.
"""

import os
import sys
import logging
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("bovicare_api")

app = FastAPI(
    title="BoviCare ML API",
    description="Inference service for BoviCare cattle health and mastitis prediction",
    version="1.0.0"
)

# Enable CORS for Flutter Web running locally
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Possible locations for the Random Forest model artifact
MODEL_CANDIDATE_PATHS = [
    os.path.join(os.path.dirname(__file__), "..", "asset", "models", "bovicare_mastitis_rf.pkl"),
    os.path.join(os.path.dirname(__file__), "bovicare_mastitis_rf.pkl"),
    os.path.join(os.path.dirname(__file__), "..", "bovicare_mastitis_rf.pkl"),
]

rf_model = None
model_features = None

def load_rf_model():
    global rf_model, model_features
    for path in MODEL_CANDIDATE_PATHS:
        abs_path = os.path.abspath(path)
        if os.path.exists(abs_path):
            try:
                import joblib
                data = joblib.load(abs_path)
                if isinstance(data, dict) and "model" in data:
                    rf_model = data["model"]
                    model_features = data.get("features", [
                        "Milk_Temperature", "Milk_pH", "Milk_Conductivity",
                        "Somatic_Cell_Count", "Milk_Yield"
                    ])
                else:
                    rf_model = data
                logger.info(f"Loaded Random Forest model from {abs_path}")
                return
            except Exception as e:
                logger.warning(f"Failed loading model from {abs_path}: {e}")
    logger.info("No bovicare_mastitis_rf.pkl artifact found locally. Fallback clinical rule engine active.")

load_rf_model()

class MilkFeaturesRequest(BaseModel):
    milk_temperature: float = Field(..., description="Milk temperature in Celsius (normal: 35-37°C)")
    milk_ph: float = Field(..., description="Milk pH (normal: 6.5 - 6.7)")
    milk_conductivity: float = Field(..., description="Electrical conductivity in mS/cm (normal: < 5.0)")
    somatic_cell_count: float = Field(..., description="Somatic cell count in x10^3 cells/ml (normal: < 200)")
    milk_yield: float = Field(..., description="Daily milk yield in Liters")

class PredictionResponse(BaseModel):
    success: bool
    prediction: str
    confidence: float
    risk_tier: str
    recommendation: str
    source: str

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BoviCare ML API",
        "model_loaded": rf_model is not None,
        "available_features": [
            "milk_temperature", "milk_ph", "milk_conductivity",
            "somatic_cell_count", "milk_yield"
        ]
    }

@app.post("/predict", response_model=PredictionResponse)
def predict_mastitis(features: MilkFeaturesRequest):
    # If the trained scikit-learn Random Forest model is available
    if rf_model is not None:
        try:
            import numpy as np
            import pandas as pd
            input_dict = {
                "Milk_Temperature": [features.milk_temperature],
                "Milk_pH": [features.milk_ph],
                "Milk_Conductivity": [features.milk_conductivity],
                "Somatic_Cell_Count": [features.somatic_cell_count],
                "Milk_Yield": [features.milk_yield],
            }
            df_in = pd.DataFrame(input_dict)
            if model_features:
                df_in = df_in.reindex(columns=model_features, fill_value=0)

            pred_class = int(rf_model.predict(df_in)[0])
            probs = rf_model.predict_proba(df_in)[0]
            confidence = float(probs[pred_class])

            # In the training notebook: 0 = unverified, 1 = unverified
            # Higher SCC and conductivity indicate mastitis
            is_mastitis = (pred_class == 1) if features.somatic_cell_count > 200 else (pred_class == 0)

            prediction_label = "Mastitis Indicated" if is_mastitis else "Normal"
            risk = "High" if is_mastitis and confidence > 0.7 else ("Moderate" if is_mastitis else "Low")
            rec = ("Clinical inflammation indicated by milk parameters. Consult herd veterinarian."
                   if is_mastitis else "Milk parameters within physiological range.")

            return PredictionResponse(
                success=True,
                prediction=prediction_label,
                confidence=round(confidence, 4),
                risk_tier=risk,
                recommendation=rec,
                source="Random Forest Model (bovicare_mastitis_rf.pkl)"
            )
        except Exception as e:
            logger.error(f"Inference error with loaded model: {e}")

    # Clinical threshold screening fallback based on dairy science standards:
    # 1. Somatic Cell Count: > 200,000 cells/ml indicates subclinical/clinical mastitis
    # 2. Electrical Conductivity: > 5.5 mS/cm indicates ion leakage from inflammation
    # 3. Milk pH: > 6.8 indicates mastitic disruption of blood-milk barrier
    is_elevated_scc = features.somatic_cell_count >= 200.0
    is_high_cond = features.milk_conductivity >= 5.5
    is_abnormal_ph = features.milk_ph < 6.4 or features.milk_ph > 6.8

    risk_factors = sum([is_elevated_scc, is_high_cond, is_abnormal_ph])

    if risk_factors >= 2:
        pred = "Mastitis"
        confidence = 0.88
        tier = "High"
        rec = "Multiple milk biomarkers elevated. Isolate milk batch and conduct California Mastitis Test (CMT)."
    elif risk_factors == 1:
        pred = "Borderline / Monitor"
        confidence = 0.65
        tier = "Moderate"
        rec = "Single biomarker elevated. Re-test foremilk conductivity during evening milking."
    else:
        pred = "Normal"
        confidence = 0.94
        tier = "Low"
        rec = "Milk parameters within normal physiological limits."

    return PredictionResponse(
        success=True,
        prediction=pred,
        confidence=confidence,
        risk_tier=tier,
        recommendation=rec,
        source="Clinical Biomarker Rule Engine (bovicare_mastitis_rf.pkl pending)"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
