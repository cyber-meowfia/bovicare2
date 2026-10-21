# Phase 4: Computer Vision Mastitis AI Screening Integration — Context

**Gathered:** 2026-10-21  
**Status:** Ready for planning / Execution

## Phase Boundary

Connect the pre-trained deep learning inference service (`MobileNetV2` via ONNX Runtime / `/api/ai-screen`) to the assessment workflow in `index.html` & `app.js`, displaying real-time mastitis risk inferences, confidence tiers, and mandatory clinical disclaimers.

## Implementation Decisions

### 1. Model Interpretation & Label Provenance
- MobileNetV2 trained on binary classification: `['Mastitis', 'Normal']`.
- Output layer: `Dense(1) + Sigmoid`.
- `Sigmoid` output corresponds to `P(Normal)`.
- `P(Mastitis)` is computed as `1.0 - raw_score`.
- Risk Tiers:
  - `High` (P(Mastitis) >= 0.65)
  - `Moderate` (0.35 <= P(Mastitis) < 0.65)
  - `Low` (P(Mastitis) < 0.35)

### 2. Screening Trigger & UI Experience
- As soon as a farmer or vet selects / uploads a photo in the assessment form (`#assessImageInput`), client triggers `/api/ai-screen`.
- The panel `#assessAiNotice` dynamically transforms from the placeholder notice into an active AI Screening Badge with:
  - Visual status pill (e.g. `Low Risk (Healthy)`, `Moderate Risk`, `High Risk`)
  - Confidence percentage (e.g., `92.4%`)
  - Curd / clot / erythema indicator details
  - Persistent, non-dismissible veterinary disclaimer: *"AI screening is an assistive diagnostic tool and does not substitute for licensed veterinary clinical evaluation."*

### 3. Server Endpoint Contract
- Endpoint: `POST /api/ai-screen`
- Accepts JSON: `{ image_path: "..." }` or `{ image_base64: "..." }`.
- Executes `python3 ml_inference.py` on the image and returns:
  - `success: true`
  - `mastitis_probability`: float
  - `normal_probability`: float
  - `risk_tier`: "Low" | "Moderate" | "High"
  - `label`: "Mastitis Indicated" | "Normal / Healthy"
  - `disclaimer`: string

### 4. Trilingual Localization
- Keys added across `en`, `mr`, `hi`:
  - `lblAiScreeningTitle`, `lblAiScreeningAnalyzing`, `lblAiRiskLow`, `lblAiRiskMod`, `lblAiRiskHigh`, `msgAiDisclaimer`

---

*Phase: 04-computer-vision-mastitis-ai-screening-integration*  
*Context gathered: 2026-10-21*
