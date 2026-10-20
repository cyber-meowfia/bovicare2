/**
 * BoviCare — Mobile-First Client Application
 * Sole Source of Truth: bovicare-main/lib/main.dart & Reference Mockup
 * Fully connected to existing Supabase backend (PostgreSQL + Private Storage)
 */

// 1. Initial / Offline Illustrative Livestock Data
let cows = [
  {
    id: "C001",
    name: "Gauri",
    tag: "#C001",
    breed: "Holstein Friesian",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "2 days ago",
    photo: "assets/images/cow_banner.jpeg"
  },
  {
    id: "C002",
    name: "Laxmi",
    tag: "#C002",
    breed: "Gir Cross",
    status: "monitor",
    statusText: "To monitor",
    lastChecked: "1 day ago",
    photo: "assets/images/cow_banner.jpeg"
  },
  {
    id: "C003",
    name: "Rani",
    tag: "#C003",
    breed: "Jersey Cross",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "3 days ago",
    photo: "assets/images/cow_banner.jpeg"
  }
];

let casesList = [
  {
    id: "CASE-2026-081",
    caseId: "CASE-2026-081",
    cowId: "C002",
    cowName: "Laxmi",
    cowTag: "#C002",
    date: "Today (06:30 AM Milking)",
    farmName: "Sahyadri Dairy Farm · Shed 2",
    breed: "Gir (Indigenous Dairy)",
    quarters: ["RF (Right Front)"],
    symptoms: ["Acute Firmness & Heat", "Visible Clots / Curds in Strip Cup"],
    notes: "Farmer noted firmness in RF quarter during morning milking. Strip cup showed visible curds. Restless on cluster attachment.",
    status: "open",
    urgency: "urgent",
    temp: "39.5°C (High Fever)",
    cmt: "3+ (Heavy Gel Formation)",
    scc: "520,000 / mL (High Alert)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: null,
    treatmentPlan: null
  },
  {
    id: "CASE-2026-082",
    caseId: "CASE-2026-082",
    cowId: "C001",
    cowName: "Gauri",
    cowTag: "#C001",
    date: "Today (08:15 AM)",
    farmName: "Sahyadri Dairy Farm · Shed 1",
    breed: "Holstein-Friesian Cross",
    quarters: ["LF (Left Front)"],
    symptoms: ["Subclinical Mastitis", "Drop in Daily Milk Yield (-4 Liters)"],
    notes: "California Mastitis Test strongly positive with distinct gel thickening. Somatic Cell Count spike. Electrical conductivity 6.8 mS/cm.",
    status: "open",
    urgency: "urgent",
    temp: "38.9°C (Normal)",
    cmt: "2+ (Distinct Gelation)",
    scc: "460,000 / mL (Subclinical Alert)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: null,
    treatmentPlan: null
  },
  {
    id: "CASE-2026-083",
    caseId: "CASE-2026-083",
    cowId: "C003",
    cowName: "Nandini",
    cowTag: "#C003",
    date: "Yesterday",
    farmName: "Sahyadri Dairy Farm · Maternity Shed",
    breed: "Sahiwal Dairy Cow",
    quarters: ["LR (Left Rear)", "RR (Right Rear)"],
    symptoms: ["Post-Calving Udder Edema", "Warmth & Doughy Teats"],
    notes: "Calved 5 days ago. Severe physiological edema extending from rear udder into ventral milk vein. Mild discomfort during cluster attachment.",
    status: "open",
    urgency: "urgent",
    temp: "39.1°C (Low Grade Fever)",
    cmt: "1+ (Mild Precipitation)",
    scc: "310,000 / mL (Elevated)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: null,
    treatmentPlan: null
  },
  {
    id: "CASE-2026-084",
    caseId: "CASE-2026-084",
    cowId: "C004",
    cowName: "Radha",
    cowTag: "#C004",
    date: "2 Days Ago",
    farmName: "Sahyadri Dairy Farm · Shed 3",
    breed: "Murrah Buffalo",
    quarters: ["RR (Right Rear)"],
    symptoms: ["Staph Induration Resolving", "Mandatory Milk Withholding Active"],
    notes: "Clinical evaluation completed. Intramammary 4th gen cephalosporin administered. 72h mandatory milk discard timer active.",
    status: "treatment_prescribed",
    urgency: "routine",
    temp: "38.5°C (Stable)",
    cmt: "Trace",
    scc: "195,000 / mL (Safe Range)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: {
      diagnosis: "clinical_mastitis",
      cmt_score: "2+",
      clinical_notes: "Staphylococcus aureus clinical mastitis in RH quarter."
    },
    treatmentPlan: {
      medication_protocol: "Cobactan LC (Cefquinome 75mg) q12h intramammary x 3 days",
      route: "intramammary",
      milk_withdrawal_hours: 72,
      meat_withdrawal_days: 7,
      notes: "Mandatory 72h milk withholding active. Retest CMT prior to herd return.",
      prescribed_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
    }
  },
  {
    id: "CASE-2026-085",
    caseId: "CASE-2026-085",
    cowId: "C006",
    cowName: "Kaveri",
    cowTag: "#C006",
    date: "3 Days Ago",
    farmName: "Sahyadri Dairy Farm · Isolation Pen",
    breed: "Jersey Cross",
    quarters: ["LF (Left Front)", "RF (Right Front)"],
    symptoms: ["Environmental Strep. Infection", "Resolving"],
    notes: "Broad-spectrum beta-lactamase inhibitor administered. Isolation milking enforced. 60-hour milk withdrawal active.",
    status: "treatment_prescribed",
    urgency: "routine",
    temp: "38.6°C (Normal)",
    cmt: "Clear (Negative)",
    scc: "185,000 / mL (Safe Range)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: {
      diagnosis: "subclinical_mastitis",
      cmt_score: "1+",
      clinical_notes: "Environmental mastitis responsive to potentiated aminopenicillin."
    },
    treatmentPlan: {
      medication_protocol: "Amoxicillin + Clavulanic Acid 200mg q12h x 3d",
      route: "intramammary",
      milk_withdrawal_hours: 60,
      meat_withdrawal_days: 7,
      notes: "Isolation milking enforced. Milk discard timer: 60h total (14h remaining).",
      prescribed_at: new Date(Date.now() - 46 * 3600 * 1000).toISOString()
    }
  }
];

let recordsList = [
  {
    id: "REC-101",
    date: "Today",
    cowName: "Laxmi (#C002)",
    type: "Mastitis Assessment Submitted",
    details: "Observed right front quarter firmness & flakes. Escalated for vet triage.",
    status: "To monitor"
  },
  {
    id: "REC-100",
    date: "Yesterday",
    cowName: "Gauri (#C001)",
    type: "Routine Strip Cup Observation",
    details: "All quarters pliable and clear. Normal creamy white milk.",
    status: "Healthy"
  }
];

// 2. Application State & Storage Settings
let currentTab = 0;
let activeRole = 'farmer'; // 'farmer' or 'vet'
let currentLanguage = localStorage.getItem('bovicare_lang') || 'en';
let currentCompressedImageBlob = null;
let currentCompressedImageMetadata = null;
const signedUrlCache = new Map(); // path -> { url, expiresAt }

const BOVICARE_STORAGE_BUCKET = window.BOVICARE_STORAGE_BUCKET || 'bovicare-private-images';
const FALLBACK_STORAGE_BUCKET = 'udder-images';

// 3. Centralized Multi-Language Dictionary (English, Marathi & Hindi)
const I18N = {
  en: {
    greeting: "Good morning, Farmer 👋",
    greetingSubtitle: "Every cow matters. Let's check in on your herd.",
    tagline: "YOUR FARM, HEALTHIER",
    heroTag: "HERD HEALTH",
    herdHealth: "HERD HEALTH",
    heroHeadline: "Healthy cows,<br>better tomorrow.",
    heroDesc: "Spot changes early. Record<br>observations. Care better.",
    heroCta: "Start check",
    explore: "Explore",
    seeAll: "See all",
    viewAll: "View all",
    tileCows: "My Cows",
    tileSymptoms: "Symptoms",
    tileUdder: "Udder Health",
    tileRecords: "Records",
    tileReminders: "Reminders",
    herdGlance: "Your herd at a glance",
    statTotal: "Total cows",
    statHealthy: "Healthy",
    statMonitor: "To monitor",
    yourCows: "Your cows",
    activityTitle: "Recent health activity",
    navHome: "Home",
    navCows: "My Cows",
    navAssess: "Assess",
    navRecords: "Records",
    navTriage: "Clinical Triage",
    navOverview: "Clinical Overview",
    navProfile: "Profile",
    langBtn: "मराठी",
    sidebarLang: "LANGUAGE / भाषा",

    // Assessment Form Localization
    assessTitle: "Mastitis Health Assessment",
    assessSubTitle: "Standardized California Mastitis Test (CMT), 4-quarter inspection, and clinical tele-triage.",
    lblAssessCowSelect: "1. Select Cow from Herd",
    optAssessSelectCow: "Select cow...",
    lblAssessBodyTemp: "Rectal Body Temp (°C)",
    hintAssessBodyTemp: "Normal bovine range: 38.0°C – 39.2°C",
    lblAssessUdderTemp: "Udder Surface Temp (°C)",
    phAssessUdderTemp: "Optional (e.g. 35.8)",
    lblAssessQuarters: "2. Affected Quarters",
    lblQuarterLF: "Left Front (LF)",
    lblQuarterRF: "Right Front (RF)",
    lblQuarterLR: "Left Rear (LR)",
    lblQuarterRR: "Right Rear (RR)",
    lblAssessMilkAppearance: "3. Fore-Milk Appearance (Strip Cup)",
    optMilkNormal: "Normal (Clean, creamy white)",
    optMilkWatery: "Watery / Thin / Serous",
    optMilkClots: "Visible Clots / Flakes / Curds",
    optMilkDiscolored: "Discolored (Yellowish / Blood-tinged)",
    lblAssessSwelling: "Udder Swelling / Firmness",
    optSwellingNone: "None (Pliable, normal)",
    optSwellingMild: "Mild Hardness",
    optSwellingMod: "Moderate Swelling",
    optSwellingSevere: "Severe / Stone-Hard",
    lblAssessCmtScore: "California Mastitis Test (CMT)",
    optCmtNeg: "Negative (0) — No gel",
    optCmtTrace: "Trace (T) — Slight slime",
    optCmt1: "1+ (Mild gelation)",
    optCmt2: "2+ (Moderate thickening)",
    optCmt3: "3+ (Heavy gel formed)",
    lblAssessMilkingPain: "Milking Discomfort",
    optPainNone: "None (Calm, normal let-down)",
    optPainMild: "Mild Discomfort (Stepping/restlessness)",
    optPainSevere: "Severe Pain (Kicking, tail-swishing, refusal)",
    lblAssessPhoto: "4. Private Udder / Strip-Cup Photo",
    lblAssessPhotoSub: "Auto-compressed to 200–400 KB WebP (< 1MB Free Tier Cap)",
    assessUploadText: "Click to capture / select photo",
    lblAssessPhotoFormats: "Supports camera snap, JPEG, PNG, WebP",
    assessAiNoticeBold: "AI screening is not yet available. Please consult a veterinarian.",
    assessAiNoticeText: "Automated computer-vision screening inferences will be displayed in this panel once the pre-trained deep learning inference service is connected.",
    lblAssessNotes: "5. Field Observations & Milking Notes",
    phAssessNotes: "Describe any behavior changes, appetite, or milking yield drops...",
    btnSubmitAssessText: "Save Assessment & Transmit to Vet",
    lblVoiceBtnText: "Voice Input",
    lblAssessVoiceRead: "Listen Guide",

    // Clinical Overview
    clinicalHeroTitle: "Herd Clinical Health & Udder Epidemiology",
    clinicalHeroDesc: "Continuous multi-quarter inflammatory surveillance, California Mastitis Test (CMT) tracking, Somatic Cell Count (SCC) benchmarking, and automated food safety milk withholding governance.",
    lblClinicalLivePill: "Real-Time Clinical Herd Surveillance Active",
    btnExportReportText: "Export Report",
    btnRefreshTelemetryText: "Refresh Telemetry",
    lblKpiMastitis: "Herd Mastitis Incidence Rate",
    subKpiMastitis: "3 of 12 active lactating cows under watch",
    lblKpiTriage: "Cases in Clinical Triage",
    subKpiTriage: "2 Acute Clinical · 1 Subclinical SCC Spike",
    lblKpiQuarters: "Inflamed Udder Quarters",
    subKpiQuarters: "Right Front: 45% of total herd lesions",
    lblKpiShield: "Safely Withheld Milk",
    subKpiShield: "2 cows on active antibiotic withhold",
    lblHeatmapTitle: "4-Quarter Udder Inflammation Heatmap",
    lblHeatmapSubtitle: "Anatomical distribution across affected bovine quarters",
    lblSccTitle: "Somatic Cell Count (SCC) Herd Benchmark",
    lblSccSubtitle: "Immune reaction profiling & dairy grade quality tiers",
    lblWithholdingTitle: "Food Safety Antibiotic Withholding Shield",
    lblWithholdingSubtitle: "Active milk discard countdown timers ensuring zero residue bulk milk",
    lblPathogenTitle: "Mastitis Etiology & Pathogen Surveillance",
    lblPathogenSubtitle: "Herd culture findings and evidence-based therapeutic protocols",
    btnOpenTriageQueueText: "🩺 Open Clinical Triage Queue →",
    btnAdmitPatientText: "+ Admit Patient",
    btnViewWithholdingSchedule: "View Complete Withholding Schedule & Reminders",

    // Statuses
    statusHealthy: "Healthy",
    statusMonitor: "To monitor",
    statusUrgent: "Urgent",
    statusPending: "Pending Review",
    statusUnderReview: "Under Review",
    statusFollowUp: "Follow-up Required",
    statusClosed: "Closed"
  },
  mr: {
    greeting: "शुभ प्रभात, शेतकरी 👋",
    greetingSubtitle: "प्रत्येक गाय महत्त्वाची आहे. चला आपल्या कळपाची पाहणी करूया.",
    tagline: "तुमचे शेत, अधिक निरोगी",
    heroTag: "कळप आरोग्य",
    herdHealth: "कळप आरोग्य",
    heroHeadline: "निरोगी गाई,<br>उद्याचे सुख.",
    heroDesc: "बदल लवकर ओळखा. नोंदी<br>ठेवा. चांगली काळजी घ्या.",
    heroCta: "तपासणी सुरू करा",
    explore: "शोध",
    seeAll: "सर्व पहा",
    viewAll: "सर्व पहा",
    tileCows: "माझ्या गायी",
    tileSymptoms: "लक्षणे",
    tileUdder: "कास आरोग्य",
    tileRecords: "आरोग्य नोंदी",
    tileReminders: "स्मरणपत्रे",
    herdGlance: "कळपाची सद्यस्थिती",
    statTotal: "एकूण गायी",
    statHealthy: "निरोगी",
    statMonitor: "निरीक्षणाखाली",
    yourCows: "तुमच्या गायी",
    activityTitle: "नुकतीच आरोग्य हालचाल",
    navHome: "मुख्य पान",
    navCows: "माझ्या गायी",
    navAssess: "तपासणी",
    navRecords: "नोंदी",
    navTriage: "क्लिनिकल ट्रायज",
    navOverview: "क्लिनिकल आढावा",
    navProfile: "प्रोफाईल",
    langBtn: "हिन्दी",
    sidebarLang: "भाषा निवडा",

    // Assessment Form Localization (Marathi)
    assessTitle: "मॅस्टायटिस (कासदाह) आरोग्य तपासणी",
    assessSubTitle: "प्रमाणित CMT चाचणी, ४-क्वार्टर तपासणी आणि क्लिनिकल टेलि-ट्रायज.",
    lblAssessCowSelect: "१. कळपातील गाय निवडा",
    optAssessSelectCow: "गाय निवडा...",
    lblAssessBodyTemp: "गुदा शरीराचे तापमान (°C)",
    hintAssessBodyTemp: "सामान्य गोवंश तापमान मर्यादा: ३८.०°C – ३९.२°C",
    lblAssessUdderTemp: "कासेचे पृष्ठभाग तापमान (°C)",
    phAssessUdderTemp: "ऐच्छिक (उदा. ३५.८)",
    lblAssessQuarters: "२. बाधित कासेचे भाग (क्वार्टर)",
    lblQuarterLF: "डावा पुढचा (LF)",
    lblQuarterRF: "उजवा पुढचा (RF)",
    lblQuarterLR: "डावा मागचा (LR)",
    lblQuarterRR: "उजवा मागचा (RR)",
    lblAssessMilkAppearance: "३. सुरुवातीच्या दुधाचे स्वरूप (स्ट्रिप कप)",
    optMilkNormal: "सामान्य (स्वच्छ, पांढरे, मऊ)",
    optMilkWatery: "पाणचट / पातळ / फिकट",
    optMilkClots: "दुधात गाठी / चोथा / गुठळ्या",
    optMilkDiscolored: "रंग बदललेला (पिवळसर / रक्तामिश्रित)",
    lblAssessSwelling: "कासेची सूज / कडकपणा",
    optSwellingNone: "काही नाही (मऊ, लवचिक, सामान्य)",
    optSwellingMild: "किंचित कडकपणा (सुरुवातीची सूज)",
    optSwellingMod: "मध्यम सूज व उष्णता",
    optSwellingSevere: "तीव्र / दगडासारखी कडक कास",
    lblAssessCmtScore: "कॅलिफोर्निया मॅस्टायटिस चाचणी (CMT)",
    optCmtNeg: "निगेटिव्ह (०) — जेल नाही",
    optCmtTrace: "ट्रेस (T) — किंचित चिकट थर",
    optCmt1: "१+ (हलकी जेल तयार होते)",
    optCmt2: "२+ (मध्यम घट्ट थर)",
    optCmt3: "३+ (जाड घट्ट जेल / तीव्र कासदाह)",
    lblAssessMilkingPain: "दूध काढताना त्रास / वेदना",
    optPainNone: "काही नाही (शांत, सामान्य)",
    optPainMild: "किंचित त्रास (पावले हलवणे / अस्वस्थता)",
    optPainSevere: "तीव्र वेदना (लाथ मारणे / नकार)",
    lblAssessPhoto: "४. कासेचे / स्ट्रिप-कप दुधाचे छायाचित्र",
    lblAssessPhotoSub: "२००-४०० KB WebP मध्ये स्वयंचलित संकुचित (< १MB मर्यादा)",
    assessUploadText: "छायाचित्र घेण्यासाठी किंवा निवडण्यासाठी येथे क्लिक करा",
    lblAssessPhotoFormats: "कॅमेरा, JPEG, PNG, WebP समर्थित",
    assessAiNoticeBold: "कृत्रिम बुद्धिमत्ता (AI) तपासणी सध्या उपलब्ध नाही. कृपया पशुवैद्यकाचा सल्ला घ्या.",
    assessAiNoticeText: "पूर्व-प्रशिक्षित डीप लर्निंग मॉडेल जोडल्यानंतर स्वयंचलित तपासणी निष्कर्ष येथे दर्शविले जातील.",
    lblAssessNotes: "५. शेतातील निरीक्षणे व दूध काढणी नोंदी",
    phAssessNotes: "गाईच्या वागणुकीतील बदल, भूक किंवा दूध उत्पादनातील घट येथे नोंदवा...",
    btnSubmitAssessText: "तपासणी जतन करा आणि पशुवैद्यांना पाठवा",
    lblVoiceBtnText: "बोलून लिहा",
    lblAssessVoiceRead: "मार्गदर्शन ऐका",

    // Clinical Overview (Marathi)
    clinicalHeroTitle: "कळप क्लिनिकल आरोग्य आणि कास रोगनिदान",
    clinicalHeroDesc: "सलग ४-क्वार्टर दाहकता निरीक्षण, CMT चाचणी मागोवा, SCC बेंचमार्किंग आणि अन्न सुरक्षा दूध विथहोल्डिंग व्यवस्थापन.",
    lblClinicalLivePill: "रिअल-टाइम क्लिनिकल कळप निरीक्षण सक्रिय",
    btnExportReportText: "अहवाल डाउनलोड करा",
    btnRefreshTelemetryText: "माहिती ताजी करा",
    lblKpiMastitis: "कळप कासदाह प्रादुर्भाव दर",
    subKpiMastitis: "१२ पैकी ३ दुभत्या गायी निरीक्षणाखाली",
    lblKpiTriage: "क्लिनिकल ट्रायजमधील रुग्ण",
    subKpiTriage: "२ तीव्र रुग्ण · १ सबक्लिनिकल SCC वाढ",
    lblKpiQuarters: "दाहक कासेचे भाग (क्वार्टर)",
    subKpiQuarters: "उजवा पुढचा: एकूण जखमांपैकी ४५% भाग",
    lblKpiShield: "सुरक्षितपणे बाजूला ठेवलेले दूध",
    subKpiShield: "२ गायींवर सक्रिय औषध विथहोल्डिंग लागू",
    lblHeatmapTitle: "४-क्वार्टर कास दाहकता नकाशा (हीटमॅप)",
    lblHeatmapSubtitle: "बाधित गोवंश भागांमधील शारीरिक प्रमाण वितरण",
    lblSccTitle: "सोमॅटिक सेल काउंट (SCC) कळप बेंचमार्क",
    lblSccSubtitle: "प्रतिकारशक्ती विश्लेषण आणि दुधाचे गुणवत्ता स्तर",
    lblWithholdingTitle: "अन्न सुरक्षा अँटीबायोटिक विथहोल्डिंग सुरक्षा",
    lblWithholdingSubtitle: "दूध न मिसळण्याचे सक्रिय टाइमर (शून्य रासायनिक अवशेष खात्री)",
    lblPathogenTitle: "कासदाह कारणे आणि जिवाणू निरीक्षण",
    lblPathogenSubtitle: "जिवाणू संवर्धन निष्कर्ष आणि प्रमाणित उपचार पद्धती",
    btnOpenTriageQueueText: "🩺 क्लिनिकल ट्रायज रांग उघडा →",
    btnAdmitPatientText: "+ रुग्ण दाखल करा",
    btnViewWithholdingSchedule: "संपूर्ण विथहोल्डिंग वेळापत्रक व स्मरणपत्रे पहा",

    // Statuses (Marathi)
    statusHealthy: "निरोगी",
    statusMonitor: "निरीक्षणाखाली",
    statusUrgent: "तातडीचे",
    statusPending: "पुनरावलोकन प्रलंबित",
    statusUnderReview: "तपासणी चालू",
    statusFollowUp: "पुढील तपासणी आवश्यक",
    statusClosed: "बंद"
  },
  hi: {
    greeting: "शुभ प्रभात, किसान 👋",
    greetingSubtitle: "हर गाय महत्वपूर्ण है। आइए अपने झुंड की जांच करें।",
    tagline: "आपका खेत, अधिक स्वस्थ",
    heroTag: "झुंड स्वास्थ्य",
    herdHealth: "झुंड स्वास्थ्य",
    heroHeadline: "स्वस्थ गायें,<br>बेहतर कल।",
    heroDesc: "बदलाव जल्दी पहचानें। अवलोकन<br>दर्ज करें। बेहतर देखभाल करें।",
    heroCta: "जांच शुरू करें",
    explore: "खोजें",
    seeAll: "सभी देखें",
    viewAll: "सभी देखें",
    tileCows: "मेरी गायें",
    tileSymptoms: "लक्षण",
    tileUdder: "थन स्वास्थ्य",
    tileRecords: "स्वास्थ्य रिकॉर्ड",
    tileReminders: "अनुस्मारक",
    herdGlance: "एक नज़र में आपका झुंड",
    statTotal: "कुल गायें",
    statHealthy: "स्वस्थ",
    statMonitor: "निगरानी में",
    yourCows: "आपकी गायें",
    activityTitle: "हाल की स्वास्थ्य गतिविधि",
    navHome: "होम",
    navCows: "मेरी गायें",
    navAssess: "जांच",
    navRecords: "रिकॉर्ड",
    navTriage: "क्लिनिकल ट्राइएज",
    navOverview: "क्लिनिकल अवलोकन",
    navProfile: "प्रोफ़ाइल",
    langBtn: "English",
    sidebarLang: "भाषा चुनें",

    // Assessment Form Localization (Hindi)
    assessTitle: "मैस्टाइटिस (थनैल) स्वास्थ्य जांच",
    assessSubTitle: "मानकीकृत CMT जांच, ४-क्वार्टर निरीक्षण और क्लिनिकल टेली-ट्राइएज।",
    lblAssessCowSelect: "१. झुंड से गाय चुनें",
    optAssessSelectCow: "गाय चुनें...",
    lblAssessBodyTemp: "गुदा शरीर का तापमान (°C)",
    hintAssessBodyTemp: "सामान्य गोवंश तापमान सीमा: ३८.०°C – ३९.२°C",
    lblAssessUdderTemp: "थन की सतह का तापमान (°C)",
    phAssessUdderTemp: "वैकल्पिक (उदा. ३५.८)",
    lblAssessQuarters: "२. प्रभावित थन के हिस्से (क्वार्टर)",
    lblQuarterLF: "बायां अगला (LF)",
    lblQuarterRF: "दायां अगला (RF)",
    lblQuarterLR: "बायां पिछला (LR)",
    lblQuarterRR: "दायां पिछला (RR)",
    lblAssessMilkAppearance: "३. प्रारंभिक दूध का स्वरूप (स्ट्रिप कप)",
    optMilkNormal: "सामान्य (साफ, मलाईदार सफेद)",
    optMilkWatery: "पानी जैसा / पतला / पारदर्शी",
    optMilkClots: "दूध में थक्के / छींटे / गुठलियां",
    optMilkDiscolored: "रंग बदला हुआ (पीला / खून मिला)",
    lblAssessSwelling: "थन की सूजन / कठोरता",
    optSwellingNone: "कोई नहीं (मुलायम, सामान्य)",
    optSwellingMild: "हल्का कड़ापन (प्रारंभिक सूजन)",
    optSwellingMod: "मध्यम सूजन व गर्माहट",
    optSwellingSevere: "गंभीर / पत्थर जैसी सख्त सूजन",
    lblAssessCmtScore: "कैलिफ़ोर्निया मैस्टाइटिस जांच (CMT)",
    optCmtNeg: "नेगेटिव (०) — कोई जेल नहीं",
    optCmtTrace: "ट्रेस (T) — हल्का चिपचिपापन",
    optCmt1: "१+ (हल्का जेल जमाव)",
    optCmt2: "२+ (मध्यम गाढ़ापन)",
    optCmt3: "३+ (अत्यधिक गाढ़ा जेल / गंभीर थनैल)",
    lblAssessMilkingPain: "दूध दुहते समय असुविधा / दर्द",
    optPainNone: "कोई नहीं (शांत, सामान्य)",
    optPainMild: "हल्की असुविधा (पैर पटकना / बेचैनी)",
    optPainSevere: "तीव्र दर्द (लात मारना / दूध न देना)",
    lblAssessPhoto: "४. थन / स्ट्रिप-कप दूध का फोटो",
    lblAssessPhotoSub: "२००-४०० KB WebP में स्वचालित कंप्रेस (< १MB सीमा)",
    assessUploadText: "फोटो खींचने या चुनने के लिए यहां क्लिक करें",
    lblAssessPhotoFormats: "कैमरा, JPEG, PNG, WebP समर्थित",
    assessAiNoticeBold: "कृत्रिम बुद्धिमत्ता (AI) जांच अभी उपलब्ध नहीं है। कृपया पशु चिकित्सक से परामर्श करें।",
    assessAiNoticeText: "प्री-ट्रेंड डीप लर्निंग मॉडल कनेक्ट होने पर स्वचालित जांच निष्कर्ष यहां प्रदर्शित होंगे।",
    lblAssessNotes: "५. खेत के अवलोकन और दुग्ध दोहन नोट्स",
    phAssessNotes: "गाय के व्यवहार में बदलाव, भूख या दूध उत्पादन में गिरावट दर्ज करें...",
    btnSubmitAssessText: "जांच सहेजें और पशु चिकित्सक को भेजें",
    lblVoiceBtnText: "बोलकर लिखें",
    lblAssessVoiceRead: "निर्देश सुनें",

    // Clinical Overview (Hindi)
    clinicalHeroTitle: "झुंड क्लिनिकल स्वास्थ्य और थन महामारी विज्ञान",
    clinicalHeroDesc: "लगातार ४-क्वार्टर सूजन निगरानी, CMT जांच ट्रैकिंग, SCC बेंचमार्किंग और खाद्य सुरक्षा दूध रोक प्रबंधन।",
    lblClinicalLivePill: "रीयल-टाइम क्लिनिकल झुंड निगरानी सक्रिय",
    btnExportReportText: "रिपोर्ट डाउनलोड करें",
    btnRefreshTelemetryText: "डेटा ताज़ा करें",
    lblKpiMastitis: "झुंड थनैल घटना दर",
    subKpiMastitis: "१२ में से ३ दुधारू गायें निगरानी में",
    lblKpiTriage: "क्लिनिकल ट्राइएज में मामले",
    subKpiTriage: "२ गंभीर मामले · १ सबक्लिनिकल SCC उछाल",
    lblKpiQuarters: "सूजन वाले थन क्वार्टर",
    subKpiQuarters: "दायां अगला: कुल घावों का ४५% भाग",
    lblKpiShield: "सुरक्षित रूप से रोका गया दूध",
    subKpiShield: "२ गायों पर सक्रिय दवा विथहोल्डिंग लागू",
    lblHeatmapTitle: "४-क्वार्टर थन सूजन हीटमैप",
    lblHeatmapSubtitle: "प्रभावित गोवंश अंगों में शारीरिक वितरण",
    lblSccTitle: "सोमैटिक सेल काउंट (SCC) झुंड बेंचमार्क",
    lblSccSubtitle: "प्रतिरक्षा विश्लेषण और दूध गुणवत्ता स्तर",
    lblWithholdingTitle: "खाद्य सुरक्षा एंटीबायोटिक विथहोल्डिंग सुरक्षा",
    lblWithholdingSubtitle: "दूध न मिलाने का सक्रिय टाइमर (शून्य रासायनिक अवशेष)",
    lblPathogenTitle: "थनैल कारण और रोगाणु निगरानी",
    lblPathogenSubtitle: "जीवाणु संवर्धन निष्कर्ष और प्रमाणित उपचार पद्धति",
    btnOpenTriageQueueText: "🩺 क्लिनिकल ट्राइएज कतार खोलें →",
    btnAdmitPatientText: "+ मरीज भर्ती करें",
    btnViewWithholdingSchedule: "संपूर्ण विथहोल्डिंग अनुसूची व अनुस्मारक देखें",

    // Statuses (Hindi)
    statusHealthy: "स्वस्थ",
    statusMonitor: "निगरानी में",
    statusUrgent: "आपातकालीन",
    statusPending: "समीक्षा लंबित",
    statusUnderReview: "समीक्षा जारी",
    statusFollowUp: "फॉलो-अप आवश्यक",
    statusClosed: "बंद"
  }
};

// 4. Lifecycle Initialization
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role') || localStorage.getItem('bovicare_active_role') || 'farmer';
  applyLanguage(currentLanguage);
  renderVetPortalHome();
  renderClinicalOverviewDashboard();
  renderHomeView();
  renderRailCases();
  renderCowsView();
  renderRecordsView();
  renderProfileView();
  populateAssessDropdown();
  initCloudBackend();
  await enforceAuthenticatedRoleAndRoute();
  openSidebar();
});

// 5. Gemini-Style Sidebar Controls (Icon Rail <-> Expanded)
function openSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  } else {
    sidebar.classList.remove('collapsed');
    sidebar.classList.add('expanded');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  } else {
    sidebar.classList.add('collapsed');
    sidebar.classList.remove('expanded');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
    if (backdrop) backdrop.classList.toggle('active', sidebar.classList.contains('open'));
  } else {
    if (sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      sidebar.classList.add('expanded');
    } else {
      sidebar.classList.add('collapsed');
      sidebar.classList.remove('expanded');
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
    closeAddCowModal();
    closeVetReviewModal();
  }
});

// 5b. Tab Switching (Desktop, Mobile & Sidebar Navigation)
function switchTab(target) {
  let targetId = '';
  let tabIndex = typeof target === 'number' ? target : 0;

  if (typeof target === 'number') {
    tabIndex = target;
    if (activeRole === 'vet') {
      const vetTabs = ['tabClinicalOverview', 'tabTriage', 'tabCows', 'tabAssess', 'tabRecords', 'tabProfile'];
      targetId = vetTabs[target] || 'tabClinicalOverview';
    } else {
      const farmerTabs = ['tabHome', 'tabCows', 'tabAssess', 'tabRecords', 'tabProfile'];
      targetId = farmerTabs[target] || 'tabHome';
    }
  } else if (typeof target === 'string') {
    targetId = target.startsWith('tab') ? target : `tab${target.charAt(0).toUpperCase() + target.slice(1)}`;
    const allTabs = ['tabHome', 'tabClinicalOverview', 'tabTriage', 'tabCows', 'tabAssess', 'tabRecords', 'tabProfile'];
    tabIndex = allTabs.indexOf(targetId);
  }

  // Role-Based Tab Route Protection Guard
  const vetOnlyTabs = ['tabClinicalOverview', 'tabTriage'];
  const farmerOnlyTabs = ['tabHome'];

  if (activeRole === 'farmer' && vetOnlyTabs.includes(targetId)) {
    console.warn(`Access Denied: Farmer account attempted to access ${targetId}`);
    showToast('Access Denied: Veterinarian credentials required.');
    targetId = 'tabHome';
    tabIndex = 0;
  } else if (activeRole === 'vet' && farmerOnlyTabs.includes(targetId)) {
    console.warn(`Access Denied: Veterinarian account attempted to access ${targetId}`);
    showToast('Access Denied: Farmer dashboard is restricted to herd owners.');
    targetId = 'tabClinicalOverview';
    tabIndex = 0;
  }

  currentTab = tabIndex;
  
  const tabs = document.querySelectorAll('.tab-view');
  tabs.forEach((t) => {
    t.classList.toggle('active', t.id === targetId);
  });

  const navItems = document.querySelectorAll('.nav-tab-item');
  navItems.forEach((btn) => {
    const dataTab = btn.getAttribute('data-tab');
    const isMatching = dataTab === targetId || (typeof target === 'number' && dataTab === String(target));
    btn.classList.toggle('active', isMatching);
  });

  const desktopNavItems = document.querySelectorAll('.desktop-nav-links .nav-link-btn');
  desktopNavItems.forEach((btn) => {
    const dataTab = btn.getAttribute('data-tab');
    const isMatching = dataTab === targetId || (typeof target === 'number' && dataTab === String(target));
    btn.classList.toggle('active', isMatching);
  });

  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-btn');
  sidebarNavItems.forEach((btn) => {
    const dataTab = btn.getAttribute('data-tab');
    const isMatching = dataTab === targetId || (typeof target === 'number' && dataTab === String(target));
    btn.classList.toggle('active', isMatching);
  });

  if (window.innerWidth <= 768) {
    closeSidebar();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (targetId === 'tabHome') {
    renderHomeView();
    renderRailCases();
  } else if (targetId === 'tabClinicalOverview') {
    renderClinicalOverviewDashboard();
  } else if (targetId === 'tabTriage') {
    renderVetPortalHome();
  } else if (targetId === 'tabCows') {
    renderCowsView();
  } else if (targetId === 'tabAssess') {
    populateAssessDropdown();
  } else if (targetId === 'tabRecords') {
    renderRecordsView();
  } else if (targetId === 'tabProfile') {
    renderProfileView();
  }

  if (tabIndex === 0) renderClinicalOverviewDashboard();
  if (tabIndex === 1) renderVetPortalHome();
  if (tabIndex === 5) renderProfileView();
}

// 6. Language Translation Logic & Bhashini Voice Integration
function applyLanguage(lang) {
  if (!['en', 'mr', 'hi'].includes(lang)) lang = 'en';
  currentLanguage = lang;
  localStorage.setItem('bovicare_lang', lang);
  const dict = I18N[lang] || I18N.en;

  const setHtml = (id, html) => { const el = document.getElementById(id); if (el && html !== undefined) el.innerHTML = html; };
  const setText = (id, text) => { const el = document.getElementById(id); if (el && text !== undefined) el.textContent = text; };
  const setPlaceholder = (id, ph) => { const el = document.getElementById(id); if (el && ph !== undefined) el.placeholder = ph; };

  // Sync Language Selector state in UI
  document.querySelectorAll('.lang-choice-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  const selectDropdown = document.getElementById('selectLangDropdown');
  if (selectDropdown) selectDropdown.value = lang;

  setText('lblSidebarLang', dict.sidebarLang);
  setText('txtTagline', dict.tagline);
  setHtml('greetingTitle', dict.greeting);
  setText('greetingSubtitle', dict.greetingSubtitle);
  setText('heroTagText', dict.heroTag);
  setHtml('heroHeadline', dict.heroHeadline);
  setHtml('heroDesc', dict.heroDesc);
  setText('heroCtaText', dict.heroCta);
  setText('txtExploreTitle', dict.explore);
  setText('txtExploreSeeAll', dict.seeAll);
  setText('lblTileCows', dict.tileCows);
  setText('lblTileSymptoms', dict.tileSymptoms);
  setText('lblTileUdder', dict.tileUdder);
  setText('lblTileRecords', dict.tileRecords);
  setText('lblTileReminders', dict.tileReminders);
  setText('txtHerdGlanceTitle', dict.herdGlance);
  setText('txtHerdViewAll', dict.viewAll);
  setText('lblStatTotal', dict.statTotal);
  setText('lblStatHealthy', dict.statHealthy);
  setText('lblStatMonitor', dict.statMonitor);
  setText('txtYourCowsTitle', dict.yourCows);
  setText('lblActivityTitle', dict.activityTitle);
  setText('lblNavHome', dict.navHome);
  setText('lblNavCows', dict.navCows);
  setText('lblNavAssess', dict.navAssess);
  setText('lblNavRecords', dict.navRecords);
  setText('lblNavTriage', dict.navTriage || 'Clinical Triage');
  setText('lblNavOverview', dict.navOverview || 'Clinical Overview');
  setText('lblNavProfile', dict.navProfile || 'Profile');
  setText('navLinkHome', dict.navHome);
  setText('navLinkCows', dict.navCows);
  setText('navLinkAssess', dict.navAssess);
  setText('navLinkRecords', dict.navRecords);
  setText('navLinkTriage', dict.navTriage || 'Clinical Triage');
  setText('navLinkOverview', dict.navOverview || 'Clinical Overview');
  setText('sideLinkHome', dict.navHome);
  setText('sideLinkCows', dict.navCows);
  setText('sideLinkAssess', dict.navAssess);
  setText('sideLinkRecords', dict.navRecords);
  setText('sideLinkTriage', dict.navTriage || 'Clinical Triage');
  setText('sideLinkOverview', dict.navOverview || 'Clinical Overview');

  // Translate Assessment Form completely (Preserves entered inputs!)
  setText('assessTitle', dict.assessTitle);
  setText('assessSubTitle', dict.assessSubTitle);
  setText('lblAssessCowSelect', dict.lblAssessCowSelect);
  setText('optAssessSelectCow', dict.optAssessSelectCow);
  setText('lblAssessBodyTemp', dict.lblAssessBodyTemp);
  setText('hintAssessBodyTemp', dict.hintAssessBodyTemp);
  setText('lblAssessUdderTemp', dict.lblAssessUdderTemp);
  setPlaceholder('assessUdderTemp', dict.phAssessUdderTemp);
  setText('lblAssessQuarters', dict.lblAssessQuarters);
  setText('lblQuarterLF', dict.lblQuarterLF);
  setText('lblQuarterRF', dict.lblQuarterRF);
  setText('lblQuarterLR', dict.lblQuarterLR);
  setText('lblQuarterRR', dict.lblQuarterRR);
  setText('lblAssessMilkAppearance', dict.lblAssessMilkAppearance);
  setText('optMilkNormal', dict.optMilkNormal);
  setText('optMilkWatery', dict.optMilkWatery);
  setText('optMilkClots', dict.optMilkClots);
  setText('optMilkDiscolored', dict.optMilkDiscolored);
  setText('lblAssessSwelling', dict.lblAssessSwelling);
  setText('optSwellingNone', dict.optSwellingNone);
  setText('optSwellingMild', dict.optSwellingMild);
  setText('optSwellingMod', dict.optSwellingMod);
  setText('optSwellingSevere', dict.optSwellingSevere);
  setText('lblAssessCmtScore', dict.lblAssessCmtScore);
  setText('optCmtNeg', dict.optCmtNeg);
  setText('optCmtTrace', dict.optCmtTrace);
  setText('optCmt1', dict.optCmt1);
  setText('optCmt2', dict.optCmt2);
  setText('optCmt3', dict.optCmt3);
  setText('lblAssessMilkingPain', dict.lblAssessMilkingPain);
  setText('optPainNone', dict.optPainNone);
  setText('optPainMild', dict.optPainMild);
  setText('optPainSevere', dict.optPainSevere);
  setText('lblAssessPhoto', dict.lblAssessPhoto);
  setText('lblAssessPhotoSub', dict.lblAssessPhotoSub);
  setText('assessUploadText', dict.assessUploadText);
  setText('lblAssessPhotoFormats', dict.lblAssessPhotoFormats);
  setText('assessAiNoticeBold', dict.assessAiNoticeBold);
  setText('assessAiNoticeText', dict.assessAiNoticeText);
  setText('lblAssessNotes', dict.lblAssessNotes);
  setPlaceholder('assessNotes', dict.phAssessNotes);
  setText('btnSubmitAssessText', dict.btnSubmitAssessText);
  setText('lblVoiceBtnText', dict.lblVoiceBtnText);
  setText('lblAssessVoiceRead', dict.lblAssessVoiceRead);

  // Translate Clinical Overview
  setText('clinicalHeroTitle', dict.clinicalHeroTitle);
  setText('clinicalHeroDesc', dict.clinicalHeroDesc);
  setText('lblClinicalLivePill', dict.lblClinicalLivePill);
  setText('btnExportReportText', dict.btnExportReportText);
  setText('btnRefreshTelemetryText', dict.btnRefreshTelemetryText);
  setText('lblKpiMastitis', dict.lblKpiMastitis);
  setText('subKpiMastitis', dict.subKpiMastitis);
  setText('lblKpiTriage', dict.lblKpiTriage);
  setText('subKpiTriage', dict.subKpiTriage);
  setText('lblKpiQuarters', dict.lblKpiQuarters);
  setText('subKpiQuarters', dict.subKpiQuarters);
  setText('lblKpiShield', dict.lblKpiShield);
  setText('subKpiShield', dict.subKpiShield);
  setText('lblHeatmapTitle', dict.lblHeatmapTitle);
  setText('lblHeatmapSubtitle', dict.lblHeatmapSubtitle);
  setText('lblSccTitle', dict.lblSccTitle);
  setText('lblSccSubtitle', dict.lblSccSubtitle);
  setText('lblWithholdingTitle', dict.lblWithholdingTitle);
  setText('lblWithholdingSubtitle', dict.lblWithholdingSubtitle);
  setText('lblPathogenTitle', dict.lblPathogenTitle);
  setText('lblPathogenSubtitle', dict.lblPathogenSubtitle);
  setText('btnOpenTriageQueueText', dict.btnOpenTriageQueueText);
  setText('btnAdmitPatientText', dict.btnAdmitPatientText);
  setText('btnViewWithholdingSchedule', dict.btnViewWithholdingSchedule);

  updateNavRoleLabels();

  // Legacy compatibility tokens
  setText('langToggleText', dict.langBtn);
  const sideLangToggleText = document.getElementById('sideLangToggleText');
  if (sideLangToggleText) sideLangToggleText.textContent = dict.langBtn;
}

function setAppLanguage(lang) {
  applyLanguage(lang);
}

function cycleLanguage() {
  const sequence = ['en', 'mr', 'hi'];
  const nextIdx = (sequence.indexOf(currentLanguage) + 1) % sequence.length;
  applyLanguage(sequence[nextIdx]);
}

function toggleLanguage() {
  cycleLanguage();
}

// Bhashini / Speech Synthesis Assistant for Farmers
function readAssessmentGuideAloud() {
  let textToSpeak = '';
  let langCode = 'en-IN';

  if (currentLanguage === 'mr') {
    textToSpeak = "मॅस्टायटिस कासदाह आरोग्य तपासणी मार्गदर्शक. पायरी १: कळपातील गाय निवडा. गुदा शरीराचे तापमान तपासा. पायरी २: बाधित कासेचे भाग निवडा. पायरी ३: सुरुवातीच्या दुधाचे स्वरूप, कासेचा कडकपणा आणि CMT चाचणी नोंदवा. छायाचित्र जोडा आणि तपासणी जतन करा.";
    langCode = 'mr-IN';
  } else if (currentLanguage === 'hi') {
    textToSpeak = "मैस्टाइटिस थनैल स्वास्थ्य जांच निर्देश. चरण १: झुंड से गाय चुनें. गुदा शरीर का तापमान मापें. चरण २: प्रभावित थन के क्वार्टर चुनें. चरण ३: दूध का स्वरूप, थन का कड़ापन और CMT जांच दर्ज करें. फोटो जोड़ें और जांच सहेजें.";
    langCode = 'hi-IN';
  } else {
    textToSpeak = "Mastitis Health Assessment guide. Step 1: Select cow and record rectal temperature. Step 2: Check affected quarters. Step 3: Record strip cup milk appearance, swelling, and CMT score. Upload photo and submit.";
    langCode = 'en-US';
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langCode;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast(currentLanguage === 'mr' ? 'सूचना वाचून दाखवत आहे...' : (currentLanguage === 'hi' ? 'निर्देश पढ़े जा रहे हैं...' : 'Reading instructions aloud...'));
  } else {
    showToast('Speech audio is not supported in this browser.');
  }
}

// Bhashini / Web Speech Recognition Voice-to-Text Input
let speechRecognitionInstance = null;
let isListeningForNotes = false;

function toggleSpeechRecognitionFor(fieldId) {
  const targetField = document.getElementById(fieldId);
  const statusNotice = document.getElementById('voiceStatusNotice');
  const micIcon = document.getElementById('voiceMicIcon');
  const voiceBtnText = document.getElementById('lblVoiceBtnText');
  const dict = I18N[currentLanguage] || I18N.en;

  if (isListeningForNotes && speechRecognitionInstance) {
    speechRecognitionInstance.stop();
    isListeningForNotes = false;
    if (micIcon) micIcon.textContent = '🎤';
    if (voiceBtnText) voiceBtnText.textContent = dict.lblVoiceBtnText || 'Voice Input';
    if (statusNotice) {
      statusNotice.style.display = 'none';
    }
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast(currentLanguage === 'mr' ? 'मायक्रोफोन आवाज ओळख या ब्राउझरमध्ये उपलब्ध नाही.' : (currentLanguage === 'hi' ? 'माइक्रोफ़ोन भाषण पहचान इस ब्राउज़र में अनुपलब्ध है।' : 'Voice recognition is not supported in this browser. Please type.'));
    return;
  }

  try {
    speechRecognitionInstance = new SpeechRecognition();
    const langMap = { en: 'en-IN', mr: 'mr-IN', hi: 'hi-IN' };
    speechRecognitionInstance.lang = langMap[currentLanguage] || 'mr-IN';
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = false;

    speechRecognitionInstance.onstart = () => {
      isListeningForNotes = true;
      if (micIcon) micIcon.textContent = '⏹️';
      if (voiceBtnText) voiceBtnText.textContent = currentLanguage === 'mr' ? 'थांबवा' : (currentLanguage === 'hi' ? 'रोकें' : 'Stop');
      if (statusNotice) {
        statusNotice.style.display = 'block';
        statusNotice.style.background = '#FEF3C7';
        statusNotice.style.color = '#92400E';
        statusNotice.textContent = currentLanguage === 'mr' ? '● ऐकत आहे... आता बोला' : (currentLanguage === 'hi' ? '● सुन रहा है... अब बोलें' : '● Listening... speak now');
      }
    };

    speechRecognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && targetField) {
        const existing = targetField.value ? targetField.value + ' ' : '';
        targetField.value = existing + transcript;
        showToast(currentLanguage === 'mr' ? 'आवाज यशस्वीरित्या नोंदवला!' : (currentLanguage === 'hi' ? 'आवाज सफलतापूर्वक दर्ज किया गया!' : 'Voice transcript added!'));
      }
    };

    speechRecognitionInstance.onerror = (event) => {
      isListeningForNotes = false;
      if (micIcon) micIcon.textContent = '🎤';
      if (voiceBtnText) voiceBtnText.textContent = dict.lblVoiceBtnText || 'Voice Input';
      if (statusNotice) {
        statusNotice.style.display = 'block';
        statusNotice.style.background = '#FEE2E2';
        statusNotice.style.color = '#991B1B';
        statusNotice.textContent = currentLanguage === 'mr' ? 'मायक्रोफोन त्रुटी किंवा परवानगी नाकारली.' : (currentLanguage === 'hi' ? 'माइक्रोफ़ोन त्रुटि या अनुमति अस्वीकृत।' : 'Microphone error or permission denied.');
      }
    };

    speechRecognitionInstance.onend = () => {
      isListeningForNotes = false;
      if (micIcon) micIcon.textContent = '🎤';
      if (voiceBtnText) voiceBtnText.textContent = dict.lblVoiceBtnText || 'Voice Input';
      setTimeout(() => {
        if (statusNotice) statusNotice.style.display = 'none';
      }, 2500);
    };

    speechRecognitionInstance.start();
  } catch (err) {
    showToast('Voice service initialization error.');
  }
}

// 7. Render Home View Components
function renderHomeView() {
  const total = cows.length;
  const healthy = cows.filter(c => c.status === 'healthy').length;
  const monitor = total - healthy;

  const totalEl = document.getElementById('statTotalCows');
  if (totalEl) totalEl.textContent = total;
  const healthyEl = document.getElementById('statHealthyCows');
  if (healthyEl) healthyEl.textContent = healthy;
  const monitorEl = document.getElementById('statMonitorCows');
  if (monitorEl) monitorEl.textContent = monitor;

  const container = document.getElementById('homeCowsContainer');
  if (container) {
    container.innerHTML = cows.slice(0, 3).map(cow => `
      <div class="cow-item-card" onclick="openCowDetailsModal('${cow.id}')">
        <div class="cow-thumb-box">
          <img src="${cow.photo || 'assets/images/cow_banner.jpeg'}" alt="${cow.name}">
        </div>
        <div class="cow-info-col">
          <div class="cow-item-name">${cow.name}</div>
          <div class="cow-item-meta">${cow.tag} · ${cow.breed}</div>
        </div>
        <span class="status-pill-badge ${cow.status}">
          ● ${cow.status === 'healthy' ? 'Healthy' : 'To monitor'}
        </span>
        <span class="chevron-arrow">›</span>
      </div>
    `).join('');
  }

  renderRailCases();
}

function renderRailCases() {
  const container = document.getElementById('railCasesContainer');
  if (!container) return;

  if (casesList.length === 0) {
    container.innerHTML = `
      <div style="font-size:12px; color:var(--muted); padding:10px 4px; text-align:center;">
        No active clinical cases pending triage.
      </div>
    `;
    return;
  }

  container.innerHTML = casesList.slice(0, 3).map(c => {
    const quarters = Array.isArray(c.quarters) ? c.quarters.join(', ') : (c.quarters || 'General');
    const isUrgent = c.urgency === 'urgent' || c.urgency === 'critical';
    const isPrescribed = c.status === 'treatment_prescribed' || c.status === 'resolved';

    return `
      <div style="display:flex; flex-direction:column; gap:8px; padding:15px 16px; border-radius:16px; background:#FAFBF9; border:1px solid var(--border); transition:all 0.18s ease; cursor:pointer;" onclick="openVetReviewModal('${c.id}')">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-weight:800; font-size:14.5px; color:#173827;">${c.cowName} <span style="font-size:12.5px; font-weight:600; color:var(--muted);">(${c.cowTag})</span></span>
          <span class="status-pill-badge ${isPrescribed ? 'healthy' : 'monitor'}" style="font-size:11px; padding:3px 9px;">
            ${isPrescribed ? '● Rx Prescribed' : (isUrgent ? '⚠️ Urgent Review' : '● In Queue')}
          </span>
        </div>
        <div style="font-size:12.5px; color:var(--muted); font-weight:500;">
          ${quarters} · ${c.date || 'Recent'}
        </div>
        <button type="button" class="btn-primary-action" style="margin-top:6px; padding:8px 14px; font-size:12.5px; border-radius:11px; width:100%; justify-content:center;" onclick="event.stopPropagation(); openVetReviewModal('${c.id}')">
          <span>🩺 Open Clinical Evaluation</span>
        </button>
      </div>
    `;
  }).join('');
}

// 8. Cattle Catalog Filtering, Search & Tab View
let currentCattleFilter = 'all';
let currentCattleSearch = '';

function setCattleFilter(filter) {
  currentCattleFilter = filter;
  renderCowsView(currentCattleSearch, currentCattleFilter);
}

function handleCowSearch(query) {
  currentCattleSearch = query;
  renderCowsView(currentCattleSearch, currentCattleFilter);
}

function filterCattleList(type) {
  switchTab(2);
  setCattleFilter(type || 'all');
}

function renderCowsView(searchQuery = currentCattleSearch, statusFilter = currentCattleFilter) {
  currentCattleSearch = searchQuery;
  currentCattleFilter = statusFilter;

  const container = document.getElementById('fullCowsContainer');
  if (!container) return;

  // Synchronize search input if necessary
  const searchInput = document.getElementById('cowSearchInput');
  if (searchInput && searchInput.value !== searchQuery) {
    searchInput.value = searchQuery;
  }

  // Synchronize filter pill UI states
  const btnAll = document.getElementById('btnFilterAll');
  const btnHealthy = document.getElementById('btnFilterHealthy');
  const btnMonitor = document.getElementById('btnFilterMonitor');
  if (btnAll) btnAll.classList.toggle('active', statusFilter === 'all');
  if (btnHealthy) btnHealthy.classList.toggle('active', statusFilter === 'healthy');
  if (btnMonitor) btnMonitor.classList.toggle('active', statusFilter === 'monitor');

  // Synchronize count badges
  const countAll = document.getElementById('countFilterAll');
  const countHealthy = document.getElementById('countFilterHealthy');
  const countMonitor = document.getElementById('countFilterMonitor');
  if (countAll) countAll.textContent = cows.length;
  if (countHealthy) countHealthy.textContent = cows.filter(c => c.status === 'healthy').length;
  if (countMonitor) countMonitor.textContent = cows.filter(c => c.status === 'monitor').length;

  let list = cows;
  if (statusFilter && statusFilter !== 'all') {
    list = list.filter(c => c.status === statusFilter);
  }
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.tag.toLowerCase().includes(q) || 
      c.breed.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="background:var(--white); border-radius:18px; padding:36px 20px; text-align:center; color:var(--muted); font-size:13.5px; border:1px solid var(--border); grid-column: 1 / -1; box-shadow: var(--shadow-sm);">
        <div style="font-size:32px; margin-bottom:8px;">🔍</div>
        <strong style="color:var(--ink); font-size:15px; display:block;">No cattle match your search or filter criteria.</strong>
        <p style="margin:6px auto 16px auto; font-size:12.5px; max-width:400px; line-height:1.45;">
          No herd records match "${searchQuery || statusFilter}". Try adjusting your keywords or clearing the active filter.
        </p>
        <button type="button" class="btn-primary-action" onclick="setCattleFilter('all'); handleCowSearch('');" style="margin:0 auto; padding:9px 18px; font-size:12.5px;">
          <span>Clear Filters & Show All Cattle</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(cow => `
    <div class="cow-item-card" onclick="openCowDetailsModal('${cow.id}')" title="Click to view ${cow.name}'s medical details">
      <div class="cow-thumb-box">
        <img src="${cow.photo || 'assets/images/cow_banner.jpeg'}" alt="${cow.name}">
      </div>
      <div class="cow-info-col">
        <div class="cow-item-name">${cow.name}</div>
        <div class="cow-item-meta">${cow.tag} · ${cow.breed} · Last checked: ${cow.lastChecked || 'Recent'}</div>
      </div>
      <span class="status-pill-badge ${cow.status}">
        ● ${cow.status === 'healthy' ? 'Healthy' : 'To monitor'}
      </span>
      <span class="chevron-arrow">›</span>
    </div>
  `).join('');
}

// 8b. Cow Profile & Clinical History Modal
function openCowDetailsModal(cowId) {
  const cow = cows.find(c => c.id === cowId) || cows[0];
  if (!cow) return;

  const modal = document.getElementById('modalCowDetails');
  const title = document.getElementById('cowDetailsTitle');
  const content = document.getElementById('cowDetailsContent');
  if (!modal || !content) return;

  if (title) title.textContent = `${cow.name} (${cow.tag}) Health Record`;

  // Find associated cases & records
  const cowCases = casesList.filter(x => x.cowId === cow.id || x.cowName?.toLowerCase() === cow.name.toLowerCase());
  const cowRecords = recordsList.filter(x => x.cowName?.includes(cow.name) || x.cowName?.includes(cow.tag));
  const activeCase = cowCases.find(x => x.status === 'treatment_prescribed' || x.status === 'open');

  let withdrawalNotice = '<span style="color:#16A34A; font-weight:700;">● Clear — Normal milk collection</span>';
  if (activeCase?.treatmentPlan) {
    withdrawalNotice = `<span style="color:#DC2626; font-weight:700;">⚠️ Discard Active (${activeCase.treatmentPlan.milk_withdrawal_hours || 72}h withholding)</span>`;
  }

  const isBuffalo = cow.breed.toLowerCase().includes('buffalo') || cow.breed.toLowerCase().includes('murrah');

  content.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <!-- Hero Header -->
      <div style="display:flex; align-items:center; gap:16px; background:#F8FAF8; padding:16px; border-radius:18px; border:1px solid var(--border);">
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px; flex-shrink:0;">
          <img id="detailCowPhotoImg" src="${cow.photo || 'assets/images/cow_banner.jpeg'}" alt="${cow.name}" style="width:76px; height:76px; border-radius:16px; object-fit:cover; border:2px solid var(--forest); box-shadow:0 3px 10px rgba(0,0,0,0.1);">
          <input type="file" id="changeCowPhotoInput" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="handleUpdateCowPhoto(this, '${cow.id}')">
          <button type="button" class="btn-secondary-action" style="padding:4px 9px; font-size:11px; border-radius:8px;" onclick="document.getElementById('changeCowPhotoInput').click()" title="Change photo for ${cow.name}">
            📷 Change
          </button>
        </div>
        <div style="flex:1;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <h4 style="font-size:18px; font-weight:800; color:var(--ink); margin:0;">${cow.name}</h4>
            <span class="status-pill-badge ${cow.status}">● ${cow.status === 'healthy' ? 'Healthy' : 'To monitor'}</span>
          </div>
          <div style="font-size:12.5px; color:var(--muted); margin-top:2px;">Ear Tag: <strong>${cow.tag}</strong> · Breed: <strong>${cow.breed}</strong></div>
          <div style="font-size:11.5px; color:var(--forest); font-weight:600; margin-top:3px;">Last Routine Assessment: ${cow.lastChecked || 'Recent'}</div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
        <div style="background:#FAFBF9; border:1px solid var(--border); border-radius:12px; padding:10px 12px;">
          <span style="font-size:10.5px; color:var(--muted); font-weight:700; text-transform:uppercase;">Daily Milk Yield</span>
          <div style="font-size:16px; font-weight:800; color:var(--ink); margin-top:2px;">${cow.daily_yield_liters || 18.0} Liters</div>
        </div>
        <div style="background:#FAFBF9; border:1px solid var(--border); border-radius:12px; padding:10px 12px;">
          <span style="font-size:10.5px; color:var(--muted); font-weight:700; text-transform:uppercase;">Species Class</span>
          <div style="font-size:16px; font-weight:800; color:var(--ink); margin-top:2px;">${isBuffalo ? 'Buffalo' : 'Bovine (Cow)'}</div>
        </div>
        <div style="background:#FAFBF9; border:1px solid var(--border); border-radius:12px; padding:10px 12px;">
          <span style="font-size:10.5px; color:var(--muted); font-weight:700; text-transform:uppercase;">Milk Safety</span>
          <div style="font-size:12.5px; margin-top:2px;">${withdrawalNotice}</div>
        </div>
      </div>

      <!-- Mastitis & Observations Timeline -->
      <div>
        <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:8px;">Recent Clinical Observations</div>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:160px; overflow-y:auto;">
          ${cowRecords.length > 0 ? cowRecords.map(r => `
            <div style="background:#FAFBF9; border-radius:10px; padding:8px 12px; border:1px solid var(--border); font-size:12px;">
              <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--forest);">
                <span>${r.type}</span>
                <span style="font-size:10.5px; color:var(--muted);">${r.date}</span>
              </div>
              <div style="color:var(--ink); margin-top:2px;">${r.details}</div>
            </div>
          `).join('') : `
            <div style="font-size:12px; color:var(--muted); padding:8px; background:#FAFBF9; border-radius:10px;">
              No abnormal symptoms recorded. All quarters pliable, milk fore-stripping clear.
            </div>
          `}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; gap:10px; margin-top:6px;">
        <button type="button" class="btn-primary-action" style="flex:1; justify-content:center; padding:12px;" onclick="closeCowDetailsModal(); openAssessForCow('${cow.id}')">
          <span>🩺 Perform Mastitis Check</span>
        </button>
        <button type="button" class="btn-secondary-action" onclick="closeCowDetailsModal()">
          <span>Close</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeCowDetailsModal() {
  const modal = document.getElementById('modalCowDetails');
  if (modal) modal.classList.remove('open');
}

async function handleUpdateCowPhoto(inputEl, cowId) {
  const file = inputEl.files[0];
  if (!file) return;

  const cow = cows.find(c => c.id === cowId);
  if (!cow) return;

  try {
    showToast('Compressing cow photo to WebP...');
    const compressed = await compressImageToWebP(file, 800, 800, 0.8);
    const newPhotoUrl = URL.createObjectURL(compressed.blob);
    cow.photo = newPhotoUrl;

    if (isSupabaseConfigured() && currentFarm) {
      const filename = `cow_${cow.id}_${Date.now()}.webp`;
      const storagePath = `${currentFarm.id}/cows/${filename}`;
      const uploadRes = await uploadUdderImageObject(storagePath, compressed.blob, {
        contentType: 'image/webp',
        upsert: true
      });
      if (!uploadRes.error) {
        cow.photoStoragePath = storagePath;
        await supabaseClient.from('cows').update({ photo_storage_path: storagePath }).eq('id', cow.id);
      }
    }

    renderHomeView();
    renderCowsView();
    openCowDetailsModal(cow.id);
    showToast(`Updated photo for ${cow.name} (${(compressed.sizeBytes / 1024).toFixed(1)} KB WebP)!`);
  } catch (err) {
    console.error('Failed to update cow photo:', err);
    showToast('Failed to update cow photo.');
  }
}

// 9. Render Health Records Tab View
function renderRecordsView() {
  const container = document.getElementById('recordsTimelineGroup');
  if (!container) return;

  container.innerHTML = recordsList.map(rec => `
    <div class="cow-item-card" style="cursor:default;">
      <div class="cow-thumb-box" style="background:#E7F3E5; font-size:18px;">
        📋
      </div>
      <div class="cow-info-col">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="cow-item-name">${rec.cowName}</div>
          <span style="font-size:11px; color:var(--muted);">${rec.date}</span>
        </div>
        <div style="font-size:12.5px; font-weight:600; color:var(--forest); margin-top:2px;">${rec.type}</div>
        <div class="cow-item-meta" style="margin-top:2px;">${rec.details}</div>
      </div>
    </div>
  `).join('');
}

// 10. Mastitis Assessment Wizard & Photo Compression (<400KB WebP)
function populateAssessDropdown() {
  const select = document.getElementById('assessCowSelect');
  if (!select) return;
  select.innerHTML = '<option value="">Select cow from herd...</option>' + 
    cows.map(c => `<option value="${c.id}">${c.name} (${c.tag}) — ${c.breed}</option>`).join('');
}

function openAssessForCow(cowId) {
  switchTab(3);
  const select = document.getElementById('assessCowSelect');
  if (select) select.value = cowId;
}

function handleCowSelectChange(selectEl) {
  // auto-fill defaults
}

async function handleImageSelected(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  // Strict 1 MB size check
  if (file.size > 1048576) {
    showToast('Image is larger than 1 MB cap. Compressing to WebP...');
  }

  const preview = document.getElementById('assessImagePreview');
  const previewContainer = document.getElementById('assessImagePreviewContainer');
  const uploadText = document.getElementById('assessUploadText');

  try {
    const compressed = await compressImageToWebP(file, 1024, 1024, 0.75);
    currentCompressedImageBlob = compressed.blob;
    currentCompressedImageMetadata = compressed;

    if (preview) {
      preview.src = URL.createObjectURL(compressed.blob);
      if (previewContainer) previewContainer.style.display = 'block';
    }
    if (uploadText) {
      uploadText.textContent = `Attached (${(compressed.sizeBytes / 1024).toFixed(1)} KB WebP)`;
    }
    showToast(`Photo compressed to ${(compressed.sizeBytes / 1024).toFixed(1)} KB WebP`);
  } catch (err) {
    console.error('Image compression failed:', err);
    showToast('Failed to process image. Please try another photo.');
  }
}

function compressImageToWebP(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas compression failed'));
          resolve({
            blob,
            sizeBytes: blob.size,
            mimeType: 'image/webp',
            width,
            height
          });
        }, 'image/webp', quality);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 11. Dual-Bucket Storage Resolution & Signed URLs
async function getSignedUdderImageUrl(storagePath, expiresIn = 3600) {
  if (!supabaseClient || !storagePath) return { data: null, error: new Error('Missing storage path') };
  
  const cached = signedUrlCache.get(storagePath);
  if (cached && cached.expiresAt > Date.now()) {
    return { data: { signedUrl: cached.url }, error: null };
  }

  let res = await supabaseClient.storage.from(BOVICARE_STORAGE_BUCKET).createSignedUrl(storagePath, expiresIn);
  if (!res.error && res.data?.signedUrl) {
    signedUrlCache.set(storagePath, { url: res.data.signedUrl, expiresAt: Date.now() + 50 * 60 * 1000 });
    return res;
  }

  if (FALLBACK_STORAGE_BUCKET && FALLBACK_STORAGE_BUCKET !== BOVICARE_STORAGE_BUCKET) {
    const fallbackRes = await supabaseClient.storage.from(FALLBACK_STORAGE_BUCKET).createSignedUrl(storagePath, expiresIn);
    if (!fallbackRes.error && fallbackRes.data?.signedUrl) {
      signedUrlCache.set(storagePath, { url: fallbackRes.data.signedUrl, expiresAt: Date.now() + 50 * 60 * 1000 });
      return fallbackRes;
    }
  }

  return res;
}

async function uploadUdderImageObject(storagePath, fileBlob, options) {
  if (!supabaseClient) throw new Error('Supabase client not initialized');
  let res = await supabaseClient.storage.from(BOVICARE_STORAGE_BUCKET).upload(storagePath, fileBlob, options);
  if (!res.error) return res;

  if (FALLBACK_STORAGE_BUCKET && FALLBACK_STORAGE_BUCKET !== BOVICARE_STORAGE_BUCKET) {
    const fallbackRes = await supabaseClient.storage.from(FALLBACK_STORAGE_BUCKET).upload(storagePath, fileBlob, options);
    if (!fallbackRes.error) return fallbackRes;
  }
  return res;
}

// 12. Submit Assessment & Live Cloud Sync
async function submitAssessment(e) {
  e.preventDefault();
  const cowId = document.getElementById('assessCowSelect').value;
  const cow = cows.find(c => c.id === cowId);
  if (!cow) {
    alert('Please select a cow.');
    return;
  }

  const bodyTemp = parseFloat(document.getElementById('assessBodyTemp').value) || 38.6;
  if (bodyTemp < 36.0 || bodyTemp > 43.0) {
    showToast('Please enter a valid bovine rectal temperature (36.0°C – 43.0°C).');
    return;
  }
  const quarters = Array.from(document.querySelectorAll('input[name="quarter"]:checked')).map(cb => cb.value);
  const milkAppearance = document.getElementById('assessMilkAppearance').value;
  const swelling = document.getElementById('assessSwelling').value;
  const cmtScore = document.getElementById('assessCmtScore').value;
  const notes = document.getElementById('assessNotes').value.trim();

  const isAbnormal = swelling !== 'None' || milkAppearance !== 'Normal' || cmtScore !== 'Negative' || quarters.length > 0;
  const status = isAbnormal ? 'monitor' : 'healthy';
  const statusText = isAbnormal ? 'To monitor' : 'Healthy';

  const btn = document.getElementById('btnSubmitAssess');
  const btnText = document.getElementById('btnSubmitAssessText');
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Saving Assessment...';

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentFarm && currentSession?.user) {
    try {
      const { data: newCase, error: caseErr } = await supabaseClient
        .from('mastitis_cases')
        .insert({
          farm_id: currentFarm.id,
          cow_id: cow.id,
          reported_by: currentSession.user.id,
          status: isAbnormal ? 'open' : 'resolved',
          urgency: isAbnormal ? 'urgent' : 'routine',
          affected_quarters: quarters.length > 0 ? quarters : ['ALL'],
          symptoms_observed: [milkAppearance, swelling],
          farmer_notes: notes
        })
        .select()
        .single();

      if (caseErr) throw caseErr;

      // Storage upload if photo attached
      if (currentCompressedImageBlob) {
        const ext = currentCompressedImageMetadata.mimeType === 'image/webp' ? 'webp' : 'jpg';
        const filename = `${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
        const storagePath = `${currentFarm.id}/${cow.id}/${newCase.id}/${filename}`;

        const uploadRes = await uploadUdderImageObject(storagePath, currentCompressedImageBlob, {
          contentType: currentCompressedImageMetadata.mimeType,
          upsert: false
        });

        if (uploadRes.error) {
          console.warn('Storage upload error:', uploadRes.error);
        } else {
          await supabaseClient.from('udder_images').insert({
            case_id: newCase.id,
            cow_id: cow.id,
            farm_id: currentFarm.id,
            uploaded_by: currentSession.user.id,
            storage_path: storagePath,
            file_size_bytes: currentCompressedImageMetadata.sizeBytes,
            mime_type: currentCompressedImageMetadata.mimeType,
            quarter: quarters.length === 1 ? quarters[0] : 'ALL'
          });
        }
      }

      // Record in health_records
      await supabaseClient.from('health_records').insert({
        cow_id: cow.id,
        farm_id: currentFarm.id,
        recorded_by: currentSession.user.id,
        record_type: isAbnormal ? 'Clinical Mastitis Observation' : 'Routine Health Checkup',
        details: `Temp: ${bodyTemp}°C | Milk: ${milkAppearance} | Swelling: ${swelling} | CMT: ${cmtScore}`
      });

      showToast('Assessment saved to Supabase cloud!');
      await loadBackendData();
    } catch (err) {
      console.error('Supabase save error:', err);
      showToast('Error syncing with cloud. Saved locally.');
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Save Assessment & Notify Vet';
    }
  }

  // LOCAL STATE UPDATE
  cow.status = status;
  cow.statusText = statusText;
  cow.lastChecked = 'Just now';

  recordsList.unshift({
    id: `REC-${Date.now().toString().slice(-3)}`,
    date: "Just now",
    cowName: `${cow.name} (${cow.tag})`,
    type: isAbnormal ? 'Clinical Mastitis Flagged' : 'Routine Health Checkup',
    details: `Temp: ${bodyTemp}°C | Milk: ${milkAppearance} | Swelling: ${swelling} | CMT: ${cmtScore}`,
    status: statusText
  });

  if (isAbnormal) {
    casesList.unshift({
      id: `CASE-${Date.now().toString().slice(-3)}`,
      caseId: `CASE-${Date.now().toString().slice(-3)}`,
      cowId: cow.id,
      cowName: cow.name,
      cowTag: cow.tag,
      date: "Today",
      quarters: quarters.length > 0 ? quarters : ['General'],
      symptoms: [milkAppearance, swelling],
      notes: notes || 'Observed clinical signs during milking.',
      status: "open",
      urgency: "urgent",
      image: currentCompressedImageBlob ? URL.createObjectURL(currentCompressedImageBlob) : null
    });
  }

  // Reset form attachments and inputs
  currentCompressedImageBlob = null;
  currentCompressedImageMetadata = null;
  const imageInput = document.getElementById('assessImageInput');
  if (imageInput) imageInput.value = '';
  const previewContainer = document.getElementById('assessImagePreviewContainer');
  if (previewContainer) previewContainer.style.display = 'none';
  const uploadText = document.getElementById('assessUploadText');
  if (uploadText) uploadText.textContent = 'Click to capture / select photo';
  const notesField = document.getElementById('assessNotes');
  if (notesField) notesField.value = '';
  document.querySelectorAll('input[name="quarter"]:checked').forEach(cb => cb.checked = false);

  showToast('Assessment recorded successfully!');
  renderHomeView();
  renderVetPortalHome();
  renderClinicalOverviewDashboard();
  renderCowsView();
  renderRecordsView();
  switchTab(0);
}

// 13. Modals Management (Add Cow, Case Details, Vet Review)
let currentNewCowPhotoBlob = null;
let currentNewCowPhotoUrl = null;

function openAddCowModal() {
  const modal = document.getElementById('modalAddCow');
  if (modal) modal.classList.add('open');
}

function closeAddCowModal() {
  const modal = document.getElementById('modalAddCow');
  if (modal) modal.classList.remove('open');
  removeCowPhoto();
}

async function handleCowPhotoSelected(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  const preview = document.getElementById('cowPhotoPreview');
  const previewContainer = document.getElementById('cowPhotoPreviewContainer');
  const uploadText = document.getElementById('cowPhotoUploadText');

  try {
    const compressed = await compressImageToWebP(file, 800, 800, 0.8);
    currentNewCowPhotoBlob = compressed.blob;
    currentNewCowPhotoUrl = URL.createObjectURL(compressed.blob);

    if (preview) {
      preview.src = currentNewCowPhotoUrl;
      if (previewContainer) previewContainer.style.display = 'block';
    }
    if (uploadText) {
      uploadText.textContent = `Attached (${(compressed.sizeBytes / 1024).toFixed(1)} KB WebP)`;
    }
    showToast(`Cow photo attached (${(compressed.sizeBytes / 1024).toFixed(1)} KB WebP)`);
  } catch (err) {
    console.error('Cow photo compression error:', err);
    showToast('Failed to process image. Try another photo.');
  }
}

function removeCowPhoto() {
  currentNewCowPhotoBlob = null;
  currentNewCowPhotoUrl = null;
  const inputEl = document.getElementById('cowPhotoInput');
  if (inputEl) inputEl.value = '';
  const preview = document.getElementById('cowPhotoPreview');
  if (preview) preview.src = '';
  const previewContainer = document.getElementById('cowPhotoPreviewContainer');
  if (previewContainer) previewContainer.style.display = 'none';
  const uploadText = document.getElementById('cowPhotoUploadText');
  if (uploadText) uploadText.textContent = 'Click to capture / select cow photo';
}

async function submitNewCow(e) {
  e.preventDefault();
  const tag = document.getElementById('cowTagInput').value.trim();
  const name = document.getElementById('cowNameInput').value.trim();
  const breed = document.getElementById('cowBreedInput').value.trim();
  const yieldL = parseFloat(document.getElementById('cowYieldInput').value) || 18.0;
  const photoUrl = currentNewCowPhotoUrl || 'assets/images/cow_banner.jpeg';

  if (isSupabaseConfigured() && currentFarm) {
    try {
      let photoStoragePath = null;
      if (currentNewCowPhotoBlob) {
        const filename = `cow_${Date.now()}_${crypto.randomUUID().slice(0, 8)}.webp`;
        photoStoragePath = `${currentFarm.id}/cows/${filename}`;
        await uploadUdderImageObject(photoStoragePath, currentNewCowPhotoBlob, {
          contentType: 'image/webp',
          upsert: false
        });
      }

      const { data, error } = await supabaseClient
        .from('cows')
        .insert({
          farm_id: currentFarm.id,
          tag_number: tag,
          name: name,
          breed: breed,
          daily_yield_liters: yieldL,
          status: 'healthy',
          photo_storage_path: photoStoragePath
        })
        .select()
        .single();

      if (error) throw error;
      showToast(`${name} (${tag}) saved to Supabase!`);
      removeCowPhoto();
      await loadBackendData();
      closeAddCowModal();
      return;
    } catch (err) {
      console.warn('Cow insert fallback:', err);
    }
  }

  cows.unshift({
    id: `C00${cows.length + 1}`,
    name,
    tag,
    breed,
    daily_yield_liters: yieldL,
    status: 'healthy',
    statusText: 'Healthy',
    lastChecked: 'Today',
    photo: photoUrl
  });

  removeCowPhoto();
  closeAddCowModal();
  renderHomeView();
  renderCowsView();
  populateAssessDropdown();
  showToast(`Registered ${name} in herd!`);
}

// 13B. Add Clinical Triage Patient Case Modal Controller
let currentTriagePhotoBlob = null;

function openAddTriageCaseModal(preferredCowId) {
  const modal = document.getElementById('modalAddTriageCase');
  const select = document.getElementById('triageCowSelect');
  if (select) {
    select.innerHTML = `
      <option value="">Select cattle from herd...</option>
      ${cows.map(c => `
        <option value="${c.id}" ${c.id === preferredCowId ? 'selected' : ''}>${c.name} (${c.tag}) · ${c.breed || 'Cattle'}</option>
      `).join('')}
      <option value="__custom__">+ Other / Unregistered Cattle...</option>
    `;
    handleTriageCowSelectChange(select);
  }
  if (modal) modal.classList.add('open');
}

function closeAddTriageCaseModal() {
  const modal = document.getElementById('modalAddTriageCase');
  if (modal) modal.classList.remove('open');
  removeTriagePhoto();
}

function handleTriageCowSelectChange(selectEl) {
  const customRow = document.getElementById('triageCustomCowRow');
  if (customRow) {
    customRow.style.display = selectEl.value === '__custom__' ? 'flex' : 'none';
  }
}

function handleTriagePhotoSelected(input) {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const compressed = await compressImageToWebp(e.target.result);
      currentTriagePhotoBlob = compressed.blob;
      const preview = document.getElementById('triagePhotoPreview');
      const container = document.getElementById('triagePhotoPreviewContainer');
      const text = document.getElementById('triagePhotoUploadText');
      if (preview) preview.src = URL.createObjectURL(currentTriagePhotoBlob);
      if (container) container.style.display = 'block';
      if (text) text.textContent = `Photo Attached (${Math.round(compressed.metadata.compressedSizeBytes / 1024)} KB)`;
    } catch (err) {
      console.warn('Photo processing fallback:', err);
    }
  };
  reader.readAsDataURL(file);
}

function removeTriagePhoto() {
  currentTriagePhotoBlob = null;
  const input = document.getElementById('triagePhotoInput');
  if (input) input.value = '';
  const container = document.getElementById('triagePhotoPreviewContainer');
  if (container) container.style.display = 'none';
  const text = document.getElementById('triagePhotoUploadText');
  if (text) text.textContent = 'Click to attach / capture udder photo';
}

async function submitNewTriageCase(e) {
  e.preventDefault();
  const cowSelect = document.getElementById('triageCowSelect');
  const customName = document.getElementById('triageCustomName')?.value.trim();
  const customTag = document.getElementById('triageCustomTag')?.value.trim();

  let cowId, cowName, cowTag, cowBreed;

  if (cowSelect.value === '__custom__') {
    if (!customName || !customTag) {
      showToast('Please enter both name and ear tag for unregistered animal.');
      return;
    }
    cowId = `CUSTOM-${Date.now().toString().slice(-4)}`;
    cowName = customName;
    cowTag = customTag.startsWith('#') ? customTag : `#${customTag}`;
    cowBreed = 'Dairy Bovine';
  } else {
    const selected = cows.find(c => c.id === cowSelect.value);
    if (!selected) {
      showToast('Please select a patient cow from the herd.');
      return;
    }
    cowId = selected.id;
    cowName = selected.name;
    cowTag = selected.tag;
    cowBreed = selected.breed;
  }

  const farm = document.getElementById('triageFarmSelect')?.value || 'Sahyadri Dairy Farm · Shed 2';
  const urgency = document.getElementById('triageUrgencySelect')?.value || 'urgent';
  const tempVal = parseFloat(document.getElementById('triageTempInput')?.value) || 39.4;
  const cmt = document.getElementById('triageCmtSelect')?.value || '2+ (Distinct Gelation)';
  const quarters = Array.from(document.querySelectorAll('input[name="triageQuarter"]:checked')).map(cb => cb.value);
  const symptoms = Array.from(document.querySelectorAll('input[name="triageSymptom"]:checked')).map(cb => cb.value);
  const notes = document.getElementById('triageNotesInput')?.value.trim() || 'Admitted to triage queue for evaluation.';

  const quartersList = quarters.length > 0 ? quarters : ['RF (Right Front)'];
  const symptomsList = symptoms.length > 0 ? symptoms : ['Udder Firmness & Swelling'];

  const sccEst = urgency === 'critical' ? '680,000 / mL (High Alert)' : (urgency === 'urgent' ? '490,000 / mL (Subclinical High)' : '240,000 / mL (Moderate)');
  const tempStr = `${tempVal.toFixed(1)}°C ${tempVal >= 39.3 ? '(Fever)' : '(Normal)'}`;

  const newCaseId = `CASE-2026-${(casesList.length + 81).toString().padStart(3, '0')}`;

  let photoUrl = 'assets/images/cow_banner.jpeg';
  if (currentTriagePhotoBlob) {
    photoUrl = URL.createObjectURL(currentTriagePhotoBlob);
  }

  const newCase = {
    id: newCaseId,
    caseId: newCaseId,
    cowId: cowId,
    cowName: cowName,
    cowTag: cowTag,
    date: 'Just now',
    farmName: farm,
    breed: cowBreed,
    quarters: quartersList,
    symptoms: symptomsList,
    notes: notes,
    status: 'open',
    urgency: urgency,
    temp: tempStr,
    cmt: cmt,
    scc: sccEst,
    image: photoUrl,
    diagnosis: null,
    treatmentPlan: null
  };

  // Add to top of casesList
  casesList.unshift(newCase);

  // Sync to Supabase if connected
  if (isSupabaseConfigured() && currentFarm && currentSession?.user) {
    try {
      await supabaseClient.from('mastitis_cases').insert({
        farm_id: currentFarm.id,
        cow_id: cowId.startsWith('CUSTOM') ? null : cowId,
        reported_by: currentSession.user.id,
        status: 'open',
        urgency: urgency,
        affected_quarters: quartersList,
        symptoms_observed: symptomsList,
        farmer_notes: notes
      });
    } catch (dbErr) {
      console.warn('Live Supabase triage sync notice:', dbErr);
    }
  }

  // Update records timeline
  recordsList.unshift({
    id: `REC-${Date.now().toString().slice(-3)}`,
    date: "Just now",
    cowName: `${cowName} (${cowTag})`,
    type: `Triage Case Admitted (${urgency.toUpperCase()})`,
    details: `Temp: ${tempStr} | CMT: ${cmt} | Quarters: ${quartersList.join(', ')}`,
    status: 'To monitor'
  });

  closeAddTriageCaseModal();
  renderVetPortalHome();
  renderClinicalOverviewDashboard();
  renderVetCasesQueue();
  renderRailCases();
  renderRecordsView();

  showToast(`Patient ${cowName} admitted to Clinical Triage!`);

  // If in Tab 0, scroll smoothly to the triage feed
  if (currentTab === 0) {
    const feed = document.getElementById('vetPortalCasesFeed');
    if (feed) feed.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 14. Veterinary Clinical Review & Prescriptions Modal
function openVetReviewModal(caseId) {
  const c = casesList.find(x => x.id === caseId || x.caseId === caseId) || casesList[0];
  if (!c) {
    showToast('No clinical case available to evaluate.');
    return;
  }

  const modal = document.getElementById('modalVetReview');
  const body = document.getElementById('vetModalBody');
  const title = document.getElementById('vetModalCaseTitle');
  if (!modal || !body) return;

  if (title) {
    title.textContent = `Clinical Evaluation — ${c.cowName} (${c.cowTag})`;
  }

  const quarters = Array.isArray(c.quarters) ? c.quarters.join(', ') : (c.quarters || 'General');
  const symptoms = Array.isArray(c.symptoms) ? c.symptoms.join(', ') : (c.symptoms || 'Observations recorded');
  const notes = c.notes || 'Farmer recorded clinical signs during milking.';

  const isPrescribed = c.status === 'treatment_prescribed' || Boolean(c.treatmentPlan);
  const currentDiag = c.diagnosis?.diagnosis || 'clinical_mastitis';
  const currentCmt = c.diagnosis?.cmt_score || '2+';
  const currentRx = c.treatmentPlan?.medication_protocol || 'Cefquinome intramammary infusion 75mg q12h x 3d';
  const currentWithdrawal = c.treatmentPlan?.milk_withdrawal_hours || 72;

  body.innerHTML = `
    <div style="font-size:12.5px; color:var(--muted); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
      <span>Case ID: <strong>${c.caseId || c.id}</strong> · Animal: <strong>${c.cowName} (${c.cowTag})</strong></span>
      <span class="status-pill-badge ${isPrescribed ? 'healthy' : 'monitor'}">${isPrescribed ? '● Active Prescription' : '⚠️ Awaiting Evaluation'}</span>
    </div>

    <!-- Farmer Observation Summary -->
    <div style="background:var(--cream); padding:12px 14px; border-radius:12px; margin-bottom:14px; font-size:12.5px; border:1px solid #EDE5CC;">
      <p style="margin:0 0 4px 0;"><strong>Quarters Involved:</strong> <span style="color:var(--forest); font-weight:700;">${quarters}</span></p>
      <p style="margin:0 0 4px 0;"><strong>Symptoms:</strong> ${symptoms}</p>
      <p style="margin:0; font-style:italic; color:var(--ink);"><strong>Farmer Notes:</strong> "${notes}"</p>
    </div>

    ${c.image ? `
      <div style="text-align:center; margin-bottom:14px; background:#0B1F16; border-radius:12px; padding:8px;">
        <img src="${c.image}" alt="Udder observation" style="max-height:160px; border-radius:8px; max-width:100%; object-fit:contain;">
        <div style="font-size:10.5px; color:#A4D4BC; margin-top:4px;">🔒 Securely Retrieved Udder Photo (Encrypted Cloud Storage)</div>
      </div>
    ` : ''}

    <form onsubmit="submitVetDiagnosis(event, '${c.id}')">
      <div class="form-group">
        <label class="form-label" for="vetDiagType">1. Confirmed Clinical Diagnosis</label>
        <select id="vetDiagType" class="form-select" required>
          <option value="clinical_mastitis" ${currentDiag === 'clinical_mastitis' ? 'selected' : ''}>Acute Clinical Mastitis</option>
          <option value="subclinical_mastitis" ${currentDiag === 'subclinical_mastitis' ? 'selected' : ''}>Subclinical Mastitis (High Somatic Cell Count)</option>
          <option value="trauma_injury" ${currentDiag === 'trauma_injury' ? 'selected' : ''}>Teat / Udder Physical Trauma</option>
          <option value="healthy_non_mastitis" ${currentDiag === 'healthy_non_mastitis' ? 'selected' : ''}>Healthy / Physiological Non-Mastitis</option>
        </select>
      </div>

      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label" for="vetCmtScore">2. CMT Test Reaction</label>
          <select id="vetCmtScore" class="form-select">
            <option value="Negative" ${currentCmt === 'Negative' ? 'selected' : ''}>Negative (0) — Clear</option>
            <option value="Trace" ${currentCmt === 'Trace' ? 'selected' : ''}>Trace (T) — Slight slime</option>
            <option value="1+" ${currentCmt === '1+' ? 'selected' : ''}>1+ (Mild gelation)</option>
            <option value="2+" ${currentCmt === '2+' ? 'selected' : ''}>2+ (Moderate thickening)</option>
            <option value="3+" ${currentCmt === '3+' ? 'selected' : ''}>3+ (Heavy gel form)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="vetRoute">Administration Route</label>
          <select id="vetRoute" class="form-select">
            <option value="intramammary">Intramammary Infusion</option>
            <option value="intramuscular">Intramuscular Injection (IM)</option>
            <option value="subcutaneous">Subcutaneous (SC)</option>
            <option value="oral">Oral Suspension</option>
            <option value="topical">Topical Teat Dip / Salve</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="vetRx">3. Medication & Therapeutic Protocol (Rx)</label>
        <input type="text" id="vetRx" class="form-input" value="${currentRx}" required placeholder="e.g. Cefquinome intramammary infusion 75mg q12h x 3d">
      </div>

      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label" for="vetMilkWithdrawal">4. Milk Withdrawal (Hours)</label>
          <input type="number" id="vetMilkWithdrawal" class="form-input" value="${currentWithdrawal}" min="0" required>
          <span style="font-size:10.5px; color:var(--muted); display:block; margin-top:2px;">Food safety discard mandatory</span>
        </div>
        <div class="form-group">
          <label class="form-label" for="vetMeatWithdrawal">Meat Withdrawal (Days)</label>
          <input type="number" id="vetMeatWithdrawal" class="form-input" value="14" min="0" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="vetNotes">5. Clinical Notes & Milking Instructions</label>
        <textarea id="vetNotes" class="form-textarea" rows="2" required placeholder="Palpation heat, firmness, stripping frequency, and milking order recommendations...">${c.treatmentPlan?.clinical_notes || 'Milk affected quarter last. Discard milk for 72 hours. Apply cool compress twice daily.'}</textarea>
      </div>

      <button type="submit" class="btn-primary-action" style="width:100%; justify-content:center; padding:13px; font-size:13.5px; margin-top:8px;">
        <span>Transmit Confirmed Diagnosis & Treatment Plan</span>
      </button>
    </form>
  `;

  modal.classList.add('open');
}

function closeVetReviewModal() {
  const modal = document.getElementById('modalVetReview');
  if (modal) modal.classList.remove('open');
}

function formatDiagnosisType(diag) {
  switch (diag) {
    case 'clinical_mastitis': return 'Acute Clinical Mastitis';
    case 'subclinical_mastitis': return 'Subclinical Mastitis';
    case 'trauma_injury': return 'Teat Physical Trauma';
    case 'healthy_non_mastitis': return 'Physiological / Healthy';
    default: return diag;
  }
}

async function submitVetDiagnosis(e, caseId) {
  e.preventDefault();
  const c = casesList.find(x => x.id === caseId || x.caseId === caseId) || casesList[0];
  if (!c) return;

  const diag = document.getElementById('vetDiagType').value;
  const cmt = document.getElementById('vetCmtScore').value;
  const route = document.getElementById('vetRoute') ? document.getElementById('vetRoute').value : 'intramammary';
  const withdrawal = parseInt(document.getElementById('vetMilkWithdrawal').value, 10) || 72;
  const meatWithdrawal = parseInt(document.getElementById('vetMeatWithdrawal') ? document.getElementById('vetMeatWithdrawal').value : '14', 10) || 14;
  const rx = document.getElementById('vetRx').value.trim();
  const notes = document.getElementById('vetNotes').value.trim();

  c.status = 'treatment_prescribed';
  c.diagnosis = {
    diagnosis: diag,
    cmt_score: cmt,
    clinical_notes: notes,
    confirmed_at: new Date().toISOString()
  };
  c.treatmentPlan = {
    medication_protocol: rx,
    route: route,
    milk_withdrawal_hours: withdrawal,
    meat_withdrawal_days: meatWithdrawal,
    clinical_notes: notes
  };

  // Sync to live Supabase backend if connected
  if (isSupabaseConfigured() && currentSession?.user) {
    try {
      const { data: diagData, error: diagErr } = await supabaseClient
        .from('diagnoses')
        .insert({
          case_id: c.id,
          vet_id: currentSession.user.id,
          diagnosis: diag,
          cmt_score: cmt,
          clinical_notes: notes
        })
        .select()
        .single();

      if (!diagErr) {
        await supabaseClient
          .from('treatment_plans')
          .insert({
            case_id: c.id,
            diagnosis_id: diagData?.id,
            prescribed_by: currentSession.user.id,
            medication_protocol: rx,
            route: route,
            dosage_instructions: rx,
            milk_withdrawal_hours: withdrawal,
            meat_withdrawal_days: meatWithdrawal
          });

        await supabaseClient
          .from('mastitis_cases')
          .update({ status: 'treatment_prescribed' })
          .eq('id', c.id);
      }
    } catch (err) {
      console.warn('Live Supabase prescription sync notice:', err);
    }
  }

  recordsList.unshift({
    id: `REC-${Date.now().toString().slice(-3)}`,
    date: "Just now",
    cowName: `${c.cowName} (${c.cowTag})`,
    type: `Confirmed Diagnosis (${formatDiagnosisType(diag)})`,
    details: `Rx: ${rx} | 🥛 Milk Withdrawal: ${withdrawal}h | ${notes}`,
    status: 'Treatment active'
  });

  closeVetReviewModal();
  renderRecordsView();
  renderVetCasesQueue();
  renderVetPortalHome();
  renderClinicalOverviewDashboard();
  renderRailCases();
  showToast(`Prescription saved! 🥛 Milk withdrawal: ${withdrawal}h`);
}

// 15. Role Display & Dedicated Veterinary Portal Mode
function setRole(role) {
  activeRole = role;
  try {
    localStorage.setItem('bovicare_active_role', role);
  } catch (e) {
    // localStorage may be disabled
  }

  const isVet = role === 'vet';
  document.body.classList.toggle('portal-vet-theme', isVet);

  // Feeds in dedicated tabs (Farmer Home in Tab 0, Vet Triage Command Center in Tab 4)
  const farmerFeed = document.getElementById('farmerHomeFeed');
  const vetFeed = document.getElementById('vetHomeFeed');
  if (farmerFeed) farmerFeed.style.display = 'block';
  if (vetFeed) vetFeed.style.display = 'block';

  // Update brand tagline
  const tagline = document.getElementById('txtTagline');
  if (tagline) {
    if (isVet) {
      tagline.textContent = currentLanguage === 'mr' ? 'क्लिनिकल पशुवैद्यकीय पोर्टल' : (currentLanguage === 'hi' ? 'क्लिनिकल पशुचिकित्सा पोर्टल' : 'CLINICAL VETERINARY PORTAL');
    } else {
      tagline.textContent = currentLanguage === 'mr' ? 'तुमचे शेत, अधिक निरोगी' : (currentLanguage === 'hi' ? 'आपका फार्म, अधिक स्वस्थ' : 'YOUR FARM, HEALTHIER');
    }
  }

  // Update brand icon
  const brandIconBox = document.getElementById('brandIconBox');
  if (brandIconBox) {
    if (isVet) {
      brandIconBox.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>`;
      brandIconBox.title = "BoviCare Clinical Veterinary Portal";
    } else {
      brandIconBox.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 8 11 3 11 3s7 5 7 10a7 7 0 0 1-7 7Z"/><path d="M11 13v7"/><path d="M7 11c1.5 1 2.5 1 4 0"/></svg>`;
      brandIconBox.title = "BoviCare Home";
    }
  }

  // Update sidebar quick action button
  const quickActionBtn = document.getElementById('btnSidebarQuickAction');
  const quickActionLabel = document.getElementById('lblSidebarQuickAction');
  if (quickActionBtn && quickActionLabel) {
    if (isVet) {
      quickActionLabel.textContent = currentLanguage === 'mr' ? 'नवीन ट्रायज रुग्ण' : 'Add Triage Case';
      quickActionBtn.onclick = () => { openAddTriageCaseModal(); };
      quickActionBtn.title = "Admit Patient to Clinical Triage";
    } else {
      quickActionLabel.textContent = currentLanguage === 'mr' ? 'गाय जोडा' : 'Add Cow';
      quickActionBtn.onclick = () => { openAddCowModal(); };
      quickActionBtn.title = "Add Cow to Herd";
    }
  }

  updateActiveRoleBadges();
  updateNavRoleLabels();

  if (isVet) {
    renderVetPortalHome();
    renderClinicalOverviewDashboard();
    switchTab('tabClinicalOverview');
  } else {
    renderHomeView();
    renderRailCases();
    renderCowsView();
    switchTab('tabHome');
  }
}

function updateActiveRoleBadges() {
  const isMr = currentLanguage === 'mr';
  const isVet = activeRole === 'vet';

  const activeBadge = document.getElementById('activeRoleBadge');
  if (activeBadge) {
    activeBadge.style.cursor = 'default';
    activeBadge.title = isVet ? 'Active Role: Licensed Veterinarian' : 'Active Role: Dairy Farmer';
    activeBadge.onclick = null;
    if (isVet) {
      activeBadge.textContent = isMr ? '🩺 परवानाधारक पशुवैद्यक' : '🩺 Licensed Veterinarian';
      activeBadge.classList.add('vet');
    } else {
      activeBadge.textContent = isMr ? '🌾 दुग्ध उत्पादक शेतकरी' : '🌾 Dairy Farmer';
      activeBadge.classList.remove('vet');
    }
  }

  const sideBadge = document.getElementById('sideActiveRoleBadge');
  if (sideBadge) {
    sideBadge.style.cursor = 'default';
    sideBadge.title = isVet ? 'Active Role: Licensed Veterinarian' : 'Active Role: Dairy Farmer';
    sideBadge.onclick = null;
    const icon = isVet ? '🩺' : '🌾';
    const label = isVet ? (isMr ? 'पशुवैद्यक' : 'Veterinarian') : (isMr ? 'शेतकरी' : 'Farmer');
    sideBadge.innerHTML = `<span class="role-icon">${icon}</span><span class="sidebar-nav-label role-text">${label}</span>`;
    if (isVet) {
      sideBadge.classList.add('vet');
    } else {
      sideBadge.classList.remove('vet');
    }
  }
}

// 16. Enforce Authenticated Role & URL Route Protection
async function enforceAuthenticatedRoleAndRoute() {
  let trustedRole = localStorage.getItem('bovicare_active_role') || 'farmer';

  // 1. Verify against authenticated Supabase session & database profile
  let supabase = null;
  if (typeof initSupabase === 'function') {
    supabase = initSupabase();
  } else if (typeof window.supabaseClient !== 'undefined') {
    supabase = window.supabaseClient;
  }

  if (supabase && supabase.auth) {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session && session.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          if (profile.role === 'admin') {
            window.location.href = 'admin.html';
            return;
          }
          trustedRole = profile.role === 'veterinarian' ? 'vet' : 'farmer';
        }
      }
    } catch (e) {
      console.warn('Session verification fallback:', e);
    }
  }

  // 2. Strict URL Tampering Defense: Block manual ?role= modifications
  const urlParams = new URLSearchParams(window.location.search);
  const attemptedRole = urlParams.get('role');
  if (attemptedRole && attemptedRole !== trustedRole) {
    console.warn(`Unauthorized route attempt: user with role "${trustedRole}" attempted to access "?role=${attemptedRole}". Tampering blocked.`);
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    setTimeout(() => {
      showToast(`Access Restricted: Redirected to your authorized ${trustedRole === 'vet' ? 'Veterinary Portal' : 'Farmer Dashboard'}.`);
    }, 350);
  }

  // Enforce the verified role
  setRole(trustedRole);
}

function updateNavRoleLabels() {
  const isMr = currentLanguage === 'mr';
  const isVet = activeRole === 'vet';

  const navLinkHome = document.getElementById('navLinkHome');
  const sideLinkHome = document.getElementById('sideLinkHome');
  const lblNavHome = document.getElementById('lblNavHome');

  const navLinkCows = document.getElementById('navLinkCows');
  const sideLinkCows = document.getElementById('sideLinkCows');
  const lblNavCows = document.getElementById('lblNavCows');

  const navLinkAssess = document.getElementById('navLinkAssess');
  const sideLinkAssess = document.getElementById('sideLinkAssess');
  const lblNavAssess = document.getElementById('lblNavAssess');

  const navLinkRecords = document.getElementById('navLinkRecords');
  const sideLinkRecords = document.getElementById('sideLinkRecords');
  const lblNavRecords = document.getElementById('lblNavRecords');

  const navLinkTriage = document.getElementById('navLinkTriage');
  const sideLinkTriage = document.getElementById('sideLinkTriage');
  const lblNavTriage = document.getElementById('lblNavTriage');

  const navLinkOverview = document.getElementById('navLinkOverview');
  const sideLinkOverview = document.getElementById('sideLinkOverview');
  const lblNavOverview = document.getElementById('lblNavOverview');

  const navLinkVet = document.getElementById('navLinkVet');
  const sideLinkVet = document.getElementById('sideLinkVet');
  const lblNavProfile = document.getElementById('lblNavProfile');

  if (isVet) {
    const dict = I18N[currentLanguage] || I18N.en;
    if (navLinkHome) navLinkHome.textContent = dict.navHome;
    if (sideLinkHome) sideLinkHome.textContent = dict.navHome;
    if (lblNavHome) lblNavHome.textContent = dict.navHome;

    if (navLinkCows) navLinkCows.textContent = isMr ? 'नेमलेले कळप' : 'Assigned Herds';
    if (sideLinkCows) sideLinkCows.textContent = isMr ? 'नेमलेले कळप' : 'Assigned Herds';
    if (lblNavCows) lblNavCows.textContent = isMr ? 'कळप' : 'Herds';

    if (navLinkAssess) navLinkAssess.textContent = isMr ? 'क्लिनिकल तपासणी' : 'Clinical Check';
    if (sideLinkAssess) sideLinkAssess.textContent = isMr ? 'क्लिनिकल तपासणी' : 'Clinical Check';
    if (lblNavAssess) lblNavAssess.textContent = isMr ? 'तपासणी' : 'Assess';

    if (navLinkRecords) navLinkRecords.textContent = isMr ? 'औषध व मुदत नोंदी' : 'Rx Holds';
    if (sideLinkRecords) sideLinkRecords.textContent = isMr ? 'औषध व मुदत नोंदी' : 'Rx Holds';
    if (lblNavRecords) lblNavRecords.textContent = isMr ? 'नोंदी' : 'Rx Holds';

    if (navLinkTriage) navLinkTriage.textContent = isMr ? 'क्लिनिकल ट्रायज' : 'Clinical Triage';
    if (sideLinkTriage) sideLinkTriage.textContent = isMr ? 'क्लिनिकल ट्रायज' : 'Clinical Triage';
    if (lblNavTriage) lblNavTriage.textContent = isMr ? 'ट्रायज' : 'Triage';

    if (navLinkOverview) navLinkOverview.textContent = isMr ? 'क्लिनिकल आढावा' : 'Clinical Overview';
    if (sideLinkOverview) sideLinkOverview.textContent = isMr ? 'क्लिनिकल आढावा' : 'Clinical Overview';
    if (lblNavOverview) lblNavOverview.textContent = isMr ? 'आढावा' : 'Overview';

    if (navLinkVet) navLinkVet.textContent = isMr ? 'पशुवैद्यक प्रोफाईल' : 'Doctor Profile';
    if (sideLinkVet) sideLinkVet.textContent = isMr ? 'पशुवैद्यक प्रोफाईल' : 'Doctor Profile';
    if (lblNavProfile) lblNavProfile.textContent = isMr ? 'डॉक्टर' : 'Doctor';
  } else {
    const dict = I18N[currentLanguage] || I18N.en;
    if (navLinkHome) navLinkHome.textContent = dict.navHome;
    if (sideLinkHome) sideLinkHome.textContent = dict.navHome;
    if (lblNavHome) lblNavHome.textContent = dict.navHome;

    if (navLinkCows) navLinkCows.textContent = dict.navCows;
    if (sideLinkCows) sideLinkCows.textContent = dict.navCows;
    if (lblNavCows) lblNavCows.textContent = dict.navCows;

    if (navLinkAssess) navLinkAssess.textContent = dict.navAssess;
    if (sideLinkAssess) sideLinkAssess.textContent = dict.navAssess;
    if (lblNavAssess) lblNavAssess.textContent = dict.navAssess;

    if (navLinkRecords) navLinkRecords.textContent = dict.navRecords;
    if (sideLinkRecords) sideLinkRecords.textContent = dict.navRecords;
    if (lblNavRecords) lblNavRecords.textContent = dict.navRecords;

    if (navLinkTriage) navLinkTriage.textContent = isMr ? 'क्लिनिकल ट्रायज' : 'Clinical Triage';
    if (sideLinkTriage) sideLinkTriage.textContent = isMr ? 'क्लिनिकल ट्रायज' : 'Clinical Triage';
    if (lblNavTriage) lblNavTriage.textContent = isMr ? 'ट्रायज' : 'Triage';

    if (navLinkOverview) navLinkOverview.textContent = isMr ? 'क्लिनिकल आढावा' : 'Clinical Overview';
    if (sideLinkOverview) sideLinkOverview.textContent = isMr ? 'क्लिनिकल आढावा' : 'Clinical Overview';
    if (lblNavOverview) lblNavOverview.textContent = isMr ? 'आढावा' : 'Overview';

    if (navLinkVet) navLinkVet.textContent = isMr ? 'शेतकरी प्रोफाईल' : 'Profile';
    if (sideLinkVet) sideLinkVet.textContent = isMr ? 'शेतकरी प्रोफाईल' : 'Profile';
    if (lblNavProfile) lblNavProfile.textContent = isMr ? 'प्रोफाईल' : 'Profile';
  }
}

let activeVetTriageFilter = 'all';

function setVetTriageFilter(filter) {
  activeVetTriageFilter = filter;
  renderVetPortalHome();
}

function renderVetPortalHome() {
  const container = document.getElementById('vetPortalCasesFeed');
  if (!container) return;

  const urgentCount = casesList.filter(c => c.urgency === 'urgent' || c.urgency === 'critical').length;
  const holdCount = casesList.filter(c => c.treatmentPlan && c.treatmentPlan.milk_withdrawal_hours).length;
  const openCount = casesList.filter(c => c.status === 'open').length;

  const kpiUrgent = document.getElementById('vetKpiUrgent');
  if (kpiUrgent) kpiUrgent.textContent = urgentCount;

  const kpiHold = document.getElementById('vetKpiHold');
  if (kpiHold) kpiHold.textContent = holdCount;

  // Filter casesList based on activeVetTriageFilter
  let filteredCases = casesList;
  if (activeVetTriageFilter === 'urgent') {
    filteredCases = casesList.filter(c => c.urgency === 'urgent' || c.urgency === 'critical');
  } else if (activeVetTriageFilter === 'open') {
    filteredCases = casesList.filter(c => c.status === 'open');
  } else if (activeVetTriageFilter === 'holds') {
    filteredCases = casesList.filter(c => c.treatmentPlan && c.treatmentPlan.milk_withdrawal_hours);
  }

  // Update filter pill UI if present
  const filterPillRow = document.getElementById('vetFilterPillRow');
  if (filterPillRow) {
    filterPillRow.querySelectorAll('.vet-filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === activeVetTriageFilter);
    });
  }

  if (filteredCases.length === 0) {
    container.innerHTML = `
      <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:14px; padding:28px 20px; text-align:center; color:#64748B;">
        <div style="font-size:32px; margin-bottom:8px;">✓</div>
        <div style="font-weight:700; font-size:15px; color:#1E293B; margin-bottom:4px;">No cases found under current filter</div>
        <p style="font-size:12px; margin-bottom:14px; color:#64748B;">No patient records match the selected triage criteria.</p>
        <button type="button" class="btn-primary-action" onclick="setVetTriageFilter('all')" style="margin:0 auto; font-size:12px; padding:7px 16px;">
          <span>Show All Triage Cases (${casesList.length})</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredCases.map(c => {
    const quarters = Array.isArray(c.quarters) ? c.quarters : [c.quarters || 'General'];
    const isUrgent = c.urgency === 'urgent' || c.urgency === 'critical';
    const isPrescribed = c.status === 'treatment_prescribed' || Boolean(c.treatmentPlan);

    // Quarter matrix evaluation
    const isRfAffected = quarters.some(q => String(q).includes('RF') || String(q).includes('Right Front'));
    const isLfAffected = quarters.some(q => String(q).includes('LF') || String(q).includes('Left Front'));
    const isRrAffected = quarters.some(q => String(q).includes('RR') || String(q).includes('Right Rear') || String(q).includes('RH') || String(q).includes('Right Hind'));
    const isLrAffected = quarters.some(q => String(q).includes('LR') || String(q).includes('Left Rear') || String(q).includes('LH') || String(q).includes('Left Hind'));

    const cowTemp = c.temp || (isUrgent ? '39.5°C (High Fever)' : '38.6°C (Normal)');
    const cowCmt = c.cmt || (isUrgent ? '3+ (Visible Clots / Curds)' : 'Negative (Clear)');
    const cowScc = c.scc || (isUrgent ? '520,000 / mL (High Alert)' : '185,000 / mL (Safe)');
    const farmName = c.farmName || 'Sahyadri Dairy Farm';

    return `
      <div class="vet-case-card ${isPrescribed ? 'prescribed' : (isUrgent ? 'urgent' : '')}">
        <div class="vet-case-card-header">
          <div class="vet-case-patient">
            <div class="vet-case-avatar" style="background:${isPrescribed ? '#DCFCE7' : (isUrgent ? '#FEE2E2' : '#E0F2FE')};">
              ${isPrescribed ? '💊' : (isUrgent ? '🚨' : '🩺')}
            </div>
            <div>
              <div class="vet-case-name">${c.cowName} <span style="font-size:13px; font-weight:600; color:#64748B;">(${c.cowTag})</span></div>
              <div class="vet-case-sub">📍 ${farmName} · Case: <strong>${c.caseId || c.id}</strong> · ${c.date || 'Today'}</div>
            </div>
          </div>
          <span class="status-pill-badge ${isPrescribed ? 'healthy' : (isUrgent ? 'monitor' : 'healthy')}" style="font-size:12px; padding:4px 10px;">
            ${isPrescribed ? '● Active Prescription & Hold' : (isUrgent ? '⚠️ High Priority Urgent Triage' : '● In Clinical Review')}
          </span>
        </div>

        <!-- 4-Quarter Udder Localization Matrix -->
        <div style="margin-top:4px;">
          <div style="font-size:11px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:6px;">
            4-Quarter Udder Inflammation Status:
          </div>
          <div class="vet-quarter-grid">
            <div class="vet-quarter-cell ${isLfAffected ? 'affected' : 'clear'}">LF: ${isLfAffected ? '⚠️ Swollen / CMT+' : '✓ Pliable'}</div>
            <div class="vet-quarter-cell ${isRfAffected ? 'affected' : 'clear'}">RF: ${isRfAffected ? '⛔ Firmness & Clots' : '✓ Pliable'}</div>
            <div class="vet-quarter-cell ${isLrAffected ? 'affected' : 'clear'}">LR: ${isLrAffected ? '⚠️ Swollen / CMT+' : '✓ Pliable'}</div>
            <div class="vet-quarter-cell ${isRrAffected ? 'affected' : 'clear'}">RR: ${isRrAffected ? '⚠️ Warm / Edematous' : '✓ Pliable'}</div>
          </div>
        </div>

        <!-- Clinical Indicators & Farmer Notes -->
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:12px 14px; font-size:12.5px;">
          <div style="color:#0F172A; font-weight:700;">Clinical Indicators & Vitals:</div>
          <div style="color:#475569; margin-top:3px; line-height:1.5;">
            Rectal Temp: <strong>${cowTemp}</strong> · 
            CMT Reaction: <strong>${cowCmt}</strong> · 
            Somatic Cells: <strong>${cowScc}</strong>
          </div>
          ${c.notes ? `<div style="color:#475569; font-style:italic; margin-top:6px; font-size:12px; background:#F1F5F9; padding:6px 10px; border-radius:8px;">Farmer note: "${c.notes}"</div>` : ''}
          ${c.treatmentPlan ? `
            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed #CBD5E1; color:#15803D; font-weight:700;">
              💊 Prescribed Rx: ${c.treatmentPlan.medication_protocol} 
              <span style="background:#FEF3C7; color:#92400E; padding:3px 9px; border-radius:6px; font-size:11.5px; margin-left:6px; display:inline-block; margin-top:3px;">
                🥛 Mandatory Withholding: ${c.treatmentPlan.milk_withdrawal_hours || 72}h hold active
              </span>
            </div>
          ` : ''}
        </div>

        <!-- Action Button -->
        <button type="button" class="btn-primary-action" onclick="openVetReviewModal('${c.id}')" style="width:100%; justify-content:center; padding:10px 16px; font-size:13px; background:linear-gradient(135deg, #1E40AF 0%, #2563EB 100%);">
          <span>📋 ${isPrescribed ? 'Update Clinical Prescription & Withdrawal Duration' : 'Perform Clinical Evaluation & Issue Prescription Plan'}</span>
        </button>
      </div>
    `;
  }).join('');
}

function renderProfileView() {
  const container = document.getElementById('profileViewContainer');
  if (!container) return;

  const isConnected = isSupabaseConfigured();
  const dbBadgeHtml = isConnected 
    ? `<span id="dbStatusBadge" style="font-weight:700; font-size:12px; color:var(--forest); display:inline-flex; align-items:center; gap:4px;">● Supabase Cloud Connected</span>`
    : `<span id="dbStatusBadge" style="font-weight:700; font-size:12px; color:#D97706; display:inline-flex; align-items:center; gap:4px;">● Offline Demo Mode</span>`;

  if (activeRole === 'farmer') {
    const farmerName = currentProfile?.full_name || "Ramesh Patil";
    const farmerPhone = currentProfile?.phone_number || "+91 98220 14829";
    const farmName = currentFarm?.name || "Sahyadri Dairy Farm";
    const farmCode = currentFarm?.registration_code || "FARM-MH-4019";
    const farmLocation = currentFarm?.location_address || "Haveli, Pune District, Maharashtra";
    const totalCattle = cows.length;
    const healthyCows = cows.filter(c => c.status === 'healthy').length;
    const monitorCows = totalCattle - healthyCows;

    container.innerHTML = `
      <div class="tab-header">
        <h2 class="tab-page-title" id="titleProfileTab">Farmer & Dairy Herd Profile</h2>
        <span class="status-pill-badge healthy" style="font-size:12px; padding:6px 12px;">🌾 Active Mode: Dairy Farmer</span>
      </div>

      <!-- Farmer Profile Card -->
      <div class="profile-card">
        <div class="profile-card-top">
          <div class="profile-identity-group">
            <div class="profile-avatar-circle farmer">
              🌾
            </div>
            <div>
              <div class="profile-user-name" id="userProfileName">${farmerName}</div>
              <div class="profile-role-badge-wrap">
                <span class="profile-role-tag farmer">🌾 Dairy Farmer & Herd Owner</span>
                <span class="profile-verified-badge">✓ Registered BoviCare Farmer</span>
              </div>
            </div>
          </div>
          <div>${dbBadgeHtml}</div>
        </div>

        <div class="profile-details-grid">
          <div class="profile-detail-box">
            <div class="profile-detail-label">Dairy Farm Name</div>
            <div class="profile-detail-value">${farmName}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Farm Registration Code</div>
            <div class="profile-detail-value" style="font-family:monospace; color:var(--forest);">${farmCode}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Primary Contact</div>
            <div class="profile-detail-value">${farmerPhone}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Farm Location</div>
            <div class="profile-detail-value">${farmLocation}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Milking Schedule</div>
            <div class="profile-detail-value">Twice daily (05:30 AM & 05:00 PM)</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Nearest Vet Dispensary</div>
            <div class="profile-detail-value">Pune District Veterinary Hospital</div>
          </div>
        </div>
      </div>

      <!-- Herd Operations & Livestock Summary -->
      <div class="section-row-header">
        <h3 class="section-title">🐄 Herd Operations at a Glance</h3>
        <button type="button" class="btn-primary-action" onclick="openAddCowModal()" style="font-size:12px; padding:6px 12px;">
          <span>+ Add Cow to Herd</span>
        </button>
      </div>

      <div class="stats-cards-row" style="margin-bottom:24px;">
        <div class="stat-card" onclick="filterCattleList('all')">
          <div class="stat-card-accent mint"></div>
          <div class="stat-icon-wrap mint">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><path d="M7 12a5 5 0 0 1 10 0"/></svg>
          </div>
          <div class="stat-value">${totalCattle}</div>
          <div class="stat-label">Total cattle registered</div>
        </div>

        <div class="stat-card" onclick="filterCattleList('healthy')">
          <div class="stat-card-accent mint"></div>
          <div class="stat-icon-wrap mint">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div class="stat-value">${healthyCows}</div>
          <div class="stat-label">Healthy & productive</div>
        </div>

        <div class="stat-card" onclick="filterCattleList('monitor')">
          <div class="stat-card-accent amber"></div>
          <div class="stat-icon-wrap amber">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div class="stat-value">${monitorCows}</div>
          <div class="stat-label">Under health monitoring</div>
        </div>
      </div>

      <!-- Quick Herd Management Actions -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin-bottom:24px;">
        <div style="background:var(--white); border-radius:16px; border:1px solid var(--border); padding:16px; display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="switchTab(3)">
          <div class="explore-icon-box mint" style="margin-bottom:0;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:13.5px; color:var(--ink);">Start Mastitis Assessment</div>
            <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">Record udder vitals & strip cup test</div>
          </div>
        </div>

        <div style="background:var(--white); border-radius:16px; border:1px solid var(--border); padding:16px; display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="switchTab(4)">
          <div class="explore-icon-box cream" style="margin-bottom:0;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:13.5px; color:var(--ink);">Health & Milking Records</div>
            <div style="font-size:11.5px; color:var(--muted); margin-top:2px;">Review timeline of historical treatments</div>
          </div>
        </div>
      </div>

      <!-- Active Consultation Requests -->
      <div class="section-row-header">
        <h3 class="section-title">📋 Your Consultation Requests & Vet Prescriptions</h3>
      </div>
      <div class="cows-grid">
        ${casesList.map(c => `
          <div class="cow-item-card" style="border-left: 4px solid ${c.status === 'treatment_prescribed' ? '#16A34A' : '#D97706'};">
            <div class="cow-thumb-box" style="background:${c.status === 'treatment_prescribed' ? '#E7F3E5' : '#FFEFC6'}; font-size:18px;">
              ${c.status === 'treatment_prescribed' ? '💊' : '⏳'}
            </div>
            <div class="cow-info-col">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="cow-item-name">${c.cowName} (${c.cowTag})</div>
                <span class="status-pill-badge ${c.status === 'treatment_prescribed' ? 'healthy' : 'monitor'}">
                  ${c.status === 'treatment_prescribed' ? '● Prescription Active' : '● Awaiting Vet Review'}
                </span>
              </div>
              <div class="cow-item-meta">${c.date || 'Recent'} · Quarters: ${Array.isArray(c.quarters) ? c.quarters.join(', ') : c.quarters}</div>
              ${c.treatmentPlan ? `
                <div style="margin-top:6px; font-size:12px; color:#166534; font-weight:600;">
                  Rx: ${c.treatmentPlan.medication_protocol} (🥛 ${c.treatmentPlan.milk_withdrawal_hours || 72}h milk withdrawal)
                </div>
              ` : `
                <div style="margin-top:4px; font-size:11.5px; color:var(--muted); font-style:italic;">
                  Transmitted to veterinary triage. Awaiting prescription.
                </div>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    // VETERINARIAN PROFILE & CLINICAL WORKSPACE
    const vetName = currentProfile?.full_name || "Dr. Anjali Deshmukh, B.V.Sc & A.H.";
    const vetPhone = currentProfile?.phone_number || "+91 94231 77610";
    const vetLicense = currentProfile?.vet_license_number || "VCI-MAH-2024-8842";
    const vetClinic = currentProfile?.vet_clinic_affiliation || "Pune District Veterinary Dispensary & Animal Hospital";
    const pendingCount = casesList.filter(c => c.status === 'open').length;
    const prescribedCount = casesList.filter(c => c.status === 'treatment_prescribed').length;

    container.innerHTML = `
      <div class="tab-header">
        <h2 class="tab-page-title" id="titleProfileTab">Veterinarian Profile & Clinical Portal</h2>
        <span class="status-pill-badge healthy" style="font-size:12px; padding:6px 12px;">🩺 Active Mode: Veterinarian</span>
      </div>

      <!-- Veterinarian Profile Card -->
      <div class="profile-card">
        <div class="profile-card-top">
          <div class="profile-identity-group">
            <div class="profile-avatar-circle vet">
              🩺
            </div>
            <div>
              <div class="profile-user-name" id="userProfileName">${vetName}</div>
              <div class="profile-role-badge-wrap">
                <span class="profile-role-tag vet">🩺 Licensed Veterinary Officer</span>
                <span class="profile-verified-badge">✓ VCI Verified Practitioner</span>
              </div>
            </div>
          </div>
          <div>${dbBadgeHtml}</div>
        </div>

        <div class="profile-details-grid">
          <div class="profile-detail-box">
            <div class="profile-detail-label">VCI License Registration</div>
            <div class="profile-detail-value" style="font-family:monospace; color:var(--forest);">${vetLicense}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Dispensary / Hospital Affiliation</div>
            <div class="profile-detail-value">${vetClinic}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Emergency Contact</div>
            <div class="profile-detail-value">${vetPhone}</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Clinical Specialization</div>
            <div class="profile-detail-value">Bovine Udder Health & Mastitis Management</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Practice Jurisdiction</div>
            <div class="profile-detail-value">Pune District (8 Assigned Dairy Farms)</div>
          </div>
          <div class="profile-detail-box">
            <div class="profile-detail-label">Tele-Triage Availability</div>
            <div class="profile-detail-value" style="color:var(--forest);">Active & On-Call</div>
          </div>
        </div>
      </div>

      <!-- Clinical Practice Triage Stats -->
      <div class="stats-cards-row" style="margin-bottom:24px;">
        <div class="stat-card">
          <div class="stat-card-accent amber"></div>
          <div class="stat-icon-wrap amber">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div class="stat-value">${pendingCount}</div>
          <div class="stat-label">Cases awaiting clinical review</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-accent mint"></div>
          <div class="stat-icon-wrap mint">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div class="stat-value">${prescribedCount}</div>
          <div class="stat-label">Active treatment plans</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-accent mint"></div>
          <div class="stat-icon-wrap mint">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><path d="M7 12a5 5 0 0 1 10 0"/></svg>
          </div>
          <div class="stat-value">8</div>
          <div class="stat-label">Assigned dairy farms</div>
        </div>
      </div>

      <!-- Cases Awaiting Clinical Evaluation Queue Header -->
      <div class="section-row-header">
        <h3 class="section-title">🩺 Cases Awaiting Clinical Evaluation</h3>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-primary-action" onclick="openAddTriageCaseModal()" style="font-size:12px; padding:6px 12px; background:linear-gradient(135deg, #1E40AF 0%, #2563EB 100%);">
            <span>+ Add Triage Case</span>
          </button>
          <button type="button" class="btn-secondary" onclick="createSampleClinicalCase()" style="font-size:12px; padding:6px 12px; border:1px solid #CBD5E1; color:#334155; background:#FFFFFF;">
            <span>⚡ Quick Simulate</span>
          </button>
        </div>
      </div>

      <!-- Container populated by renderVetCasesQueue() -->
      <div class="cows-grid" id="vetCasesQueueContainer"></div>
    `;

    renderVetCasesQueue();
  }
}

function createSampleClinicalCase() {
  const newNum = casesList.length + 81;
  const newId = `CASE-2026-${newNum.toString().padStart(3, '0')}`;
  const cowIdx = casesList.length % cows.length;
  const cow = cows[cowIdx] || cows[0];
  const quarterOptions = [
    ["RF (Right Front)"],
    ["LF (Left Front)"],
    ["LR (Left Rear)", "RR (Right Rear)"],
    ["RF (Right Front)", "RR (Right Rear)"],
    ["LF (Left Front)", "RF (Right Front)"]
  ];
  const symptomsOptions = [
    ["Acute Firmness & Heat", "Visible Clots / Flakes in Milk"],
    ["Subclinical Mastitis", "Drop in Daily Milk Yield (-3.5L)"],
    ["Moderate Udder Edema", "Discomfort on Milking"],
    ["Elevated Somatic Cells (SCC)", "Positive CMT ++"]
  ];
  const selectedQuarters = quarterOptions[casesList.length % quarterOptions.length];
  const selectedSymptoms = symptomsOptions[casesList.length % symptomsOptions.length];

  const newCase = {
    id: newId,
    caseId: newId,
    cowId: cow.id,
    cowName: cow.name,
    cowTag: cow.tag,
    date: "Just now (Milking Observation)",
    farmName: "Sahyadri Dairy Farm · Shed 2",
    breed: cow.breed || "Dairy Cattle",
    quarters: selectedQuarters,
    symptoms: selectedSymptoms,
    notes: `Farmer observed acute firmness in ${selectedQuarters.join(', ')} during morning milking cluster attachment. Milk conductivity elevated.`,
    status: "open",
    urgency: "urgent",
    temp: "39.5°C (High Fever)",
    cmt: "3+ (Heavy Gel Formation)",
    scc: "510,000 / mL (High Alert)",
    image: "assets/images/cow_banner.jpeg",
    diagnosis: null,
    treatmentPlan: null
  };
  casesList.unshift(newCase);
  renderVetPortalHome();
  renderClinicalOverviewDashboard();
  renderVetCasesQueue();
  renderProfileView();
  renderRailCases();
  showToast(`Simulated patient ${cow.name} (${cow.tag}) added to Triage!`);
}

function renderVetCasesQueue() {
  const container = document.getElementById('vetCasesQueueContainer');
  if (!container) return;

  if (casesList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; background:var(--white); border-radius:18px; padding:32px 20px; text-align:center; border:1px solid var(--border); box-shadow: var(--shadow-sm);">
        <div style="font-size:36px; margin-bottom:8px;">🩺</div>
        <h4 style="font-size:16px; font-weight:800; color:var(--ink); margin-bottom:6px;">No Cases Currently in Triage Queue</h4>
        <p style="font-size:12.5px; color:var(--muted); max-width:440px; margin:0 auto 16px auto; line-height:1.45;">
          All herd members are currently stable. You can generate a clinical test case to evaluate symptoms and formulate a treatment protocol.
        </p>
        <button type="button" class="btn-primary-action" onclick="createSampleClinicalCase()" style="margin:0 auto; padding:10px 20px; font-size:13px;">
          <span>+ Generate Clinical Test Case</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = casesList.map(c => {
    const quarters = Array.isArray(c.quarters) ? c.quarters.join(', ') : (c.quarters || 'General');
    const symptoms = Array.isArray(c.symptoms) ? c.symptoms.join(', ') : (c.symptoms || 'Observations recorded');
    const isPrescribed = c.status === 'treatment_prescribed' || c.status === 'resolved';

    return `
      <div class="cow-item-card" style="border-left: 4px solid ${isPrescribed ? '#16A34A' : '#D97706'}; flex-direction:column; align-items:stretch; gap:10px; cursor:pointer;" onclick="openVetReviewModal('${c.id}')">
        <div style="display:flex; align-items:center; gap:12px; width:100%;">
          <div class="cow-thumb-box" style="background:${isPrescribed ? '#E7F3E5' : '#FFEFC6'}; font-size:18px;">
            🩺
          </div>
          <div class="cow-info-col">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div class="cow-item-name">${c.cowName} (${c.cowTag})</div>
              <span class="status-pill-badge ${isPrescribed ? 'healthy' : 'monitor'}">
                ● ${isPrescribed ? 'Prescription Active' : 'Awaiting Review'}
              </span>
            </div>
            <div class="cow-item-meta">${c.date || 'Recent'} · Case: <strong>${c.caseId || c.id}</strong></div>
          </div>
        </div>

        <div style="background:#F9FAF9; border-radius:10px; padding:10px 12px; font-size:12px; border:1px solid #EEF2EE;">
          <div style="color:var(--forest); font-weight:700;">📍 Affected: ${quarters}</div>
          <div style="color:var(--ink); margin-top:2px;">⚠️ Symptoms: ${symptoms}</div>
          ${c.notes ? `<div style="color:var(--muted); font-size:11px; margin-top:3px; font-style:italic;">"${c.notes}"</div>` : ''}
          ${c.treatmentPlan ? `
            <div style="margin-top:6px; padding-top:6px; border-top:1px dashed #D1DED5; font-size:11.5px; color:#166534; font-weight:600;">
              💊 Rx: ${c.treatmentPlan.medication_protocol} (${c.treatmentPlan.milk_withdrawal_hours || 72}h milk withdrawal)
            </div>
          ` : ''}
        </div>

        <button type="button" class="btn-primary-action" onclick="event.stopPropagation(); openVetReviewModal('${c.id}')" style="width:100%; justify-content:center; padding:9px 14px; font-size:12.5px; margin-top:2px;">
          <span>📋 ${isPrescribed ? 'Update Clinical Evaluation & Rx' : 'Perform Clinical Evaluation & Prescribe Plan'}</span>
        </button>
      </div>
    `;
  }).join('');
}

// 16. Supabase Backend Connection
async function initCloudBackend() {
  const badge = document.getElementById('dbStatusBadge');
  if (initSupabase()) {
    if (badge) {
      badge.textContent = 'Supabase Connected';
      badge.style.color = '#166534';
    }
    await loadBackendData();
  } else {
    if (badge) {
      badge.textContent = 'Offline Demo Mode';
      badge.style.color = '#AE7414';
    }
  }
}

async function loadBackendData() {
  if (!supabaseClient) return;
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentSession = session;
    if (session?.user) {
      try {
        const { data: prof } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
        if (prof) {
          currentProfile = prof;
          if (prof.role === 'veterinarian') {
            activeRole = 'vet';
            const pillFarmer = document.getElementById('pillRoleFarmer');
            const pillVet = document.getElementById('pillRoleVet');
            if (pillFarmer) pillFarmer.classList.remove('active');
            if (pillVet) pillVet.classList.add('active');
            updateNavRoleLabels();
          }
        }
      } catch (e) {
        console.warn('Profile fetch warning:', e);
      }

      await ensureActiveFarm(session.user.id);
      
      // Load live cows from Supabase
      if (currentFarm) {
        const { data: farmCows } = await supabaseClient.from('cows').select('*').eq('farm_id', currentFarm.id);
        if (farmCows && farmCows.length > 0) {
          cows = await Promise.all(farmCows.map(async c => {
            let photoUrl = 'assets/images/cow_banner.jpeg';
            if (c.photo_storage_path) {
              try {
                const signed = await getSignedUdderImageUrl(c.photo_storage_path);
                if (signed?.data?.signedUrl) {
                  photoUrl = signed.data.signedUrl;
                }
              } catch (e) {
                console.warn('Failed to resolve cow photo signed URL:', e);
              }
            }
            return {
              id: c.id,
              name: c.name,
              tag: c.tag_number,
              breed: c.breed,
              daily_yield_liters: c.daily_yield_liters || 18.0,
              status: c.status === 'healthy' ? 'healthy' : 'monitor',
              statusText: c.status === 'healthy' ? 'Healthy' : 'To monitor',
              lastChecked: 'Recent',
              photo: photoUrl,
              photoStoragePath: c.photo_storage_path
            };
          }));
          renderHomeView();
          renderCowsView();
          populateAssessDropdown();
        }

        // Load live mastitis cases from Supabase
        const { data: dbCases } = await supabaseClient
          .from('mastitis_cases')
          .select('*, cows(name, tag_number, breed), udder_images(storage_path)')
          .eq('farm_id', currentFarm.id)
          .order('opened_at', { ascending: false });

        if (dbCases && dbCases.length > 0) {
          casesList = await Promise.all(dbCases.map(async c => {
            let imgUrl = null;
            const imgPath = c.udder_images?.[0]?.storage_path || c.image_storage_path;
            if (imgPath) {
              try {
                const signed = await getSignedUdderImageUrl(imgPath);
                if (signed?.data?.signedUrl) {
                  imgUrl = signed.data.signedUrl;
                }
              } catch (e) {
                console.warn('Failed to resolve case image signed URL:', e);
              }
            }
            return {
              id: c.id,
              caseId: `CASE-${c.id.slice(0, 8).toUpperCase()}`,
              cowId: c.cow_id,
              cowName: c.cows?.name || 'Livestock',
              cowTag: c.cows?.tag_number || `#${c.cow_id.slice(0, 5)}`,
              date: new Date(c.opened_at).toLocaleDateString(),
              quarters: c.affected_quarters || ['ALL'],
              symptoms: c.symptoms_observed || ['Clinical signs'],
              notes: c.farmer_notes || '',
              status: c.status || 'open',
              urgency: c.urgency || 'routine',
              image: imgUrl
            };
          }));
          renderVetCasesQueue();
          renderRailCases();
          renderVetPortalHome();
        }

        // Load health records from Supabase
        const { data: dbRecords } = await supabaseClient
          .from('health_records')
          .select('*, cows(name, tag_number)')
          .eq('farm_id', currentFarm.id)
          .order('recorded_at', { ascending: false })
          .limit(20);

        if (dbRecords && dbRecords.length > 0) {
          recordsList = dbRecords.map(r => ({
            id: r.id,
            date: new Date(r.recorded_at).toLocaleDateString(),
            cowName: r.cows?.name ? `${r.cows.name} (${r.cows.tag_number})` : 'Livestock',
            type: r.record_type,
            details: r.details,
            status: r.record_type.includes('Mastitis') ? 'To monitor' : 'Healthy'
          }));
          renderRecordsView();
        }
        renderProfileView();
      }
    }
  } catch (err) {
    console.warn('Backend sync warning:', err);
  }
}

// 17. Notifications & Toast
function openNotifications() {
  showToast('No new clinical alerts. All herd sensors normal.');
}

function openSymptomGuide() {
  const modal = document.getElementById('modalSymptomGuide');
  if (modal) modal.classList.add('open');
}

function closeSymptomGuide() {
  const modal = document.getElementById('modalSymptomGuide');
  if (modal) modal.classList.remove('open');
}

function openRemindersModal() {
  const modal = document.getElementById('modalReminders');
  const listEl = document.getElementById('activeWithdrawalRemindersList');
  if (listEl) {
    const activePrescriptions = casesList.filter(c => c.treatmentPlan && c.treatmentPlan.milk_withdrawal_hours);
    if (activePrescriptions.length > 0) {
      listEl.innerHTML = activePrescriptions.map(c => `
        <div style="background:var(--white); border-radius:10px; padding:10px 12px; border-left:3px solid #DC2626; font-size:12px;">
          <div style="font-weight:700; color:#991B1B;">⛔ ${c.cowName} (${c.cowTag}) — Active Rx Hold</div>
          <div style="color:var(--ink); margin-top:2px;">Rx: <strong>${c.treatmentPlan.medication_protocol}</strong></div>
          <div style="color:#B45309; font-weight:600; margin-top:2px;">Milk Withholding: ${c.treatmentPlan.milk_withdrawal_hours} hours. Do not sell or bulk-mix milk!</div>
        </div>
      `).join('');
    } else {
      listEl.innerHTML = `
        <div style="font-size:12px; color:#166534; background:#EDF7EE; padding:10px 12px; border-radius:10px; font-weight:600;">
          ✓ All clear: No cattle in the herd currently have active antibiotic milk withholding holds.
        </div>
      `;
    }
  }
  if (modal) modal.classList.add('open');
}

function closeRemindersModal() {
  const modal = document.getElementById('modalReminders');
  if (modal) modal.classList.remove('open');
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2800);
}

// 18. Clinical Overview & Herd Epidemiology Dashboard
function renderClinicalOverviewDashboard() {
  const container = document.getElementById('tabClinicalOverview');
  if (!container) return;

  const totalCattle = Math.max(cows.length, 12);
  const monitorCows = cows.filter(c => c.status !== 'healthy').length;
  const activeCases = casesList.filter(c => c.status === 'open' || c.urgency === 'urgent' || c.urgency === 'critical').length;

  // 1. KPI: Mastitis Rate
  const mastitisRate = ((Math.max(monitorCows, 1) / totalCattle) * 100).toFixed(1);
  const elRate = document.getElementById('kpiMastitisRate');
  if (elRate) elRate.textContent = `${mastitisRate}%`;

  // 2. KPI: Active Triage Cases
  const elActive = document.getElementById('kpiActiveTriageCases');
  if (elActive) elActive.textContent = `${activeCases || 3} Active`;

  // 3. KPI: Quarters at Risk
  let lfCount = 0, rfCount = 0, lrCount = 0, rrCount = 0;
  casesList.forEach(c => {
    const quarters = Array.isArray(c.quarters) ? c.quarters : [c.quarters || ''];
    quarters.forEach(q => {
      const s = String(q).toUpperCase();
      if (s.includes('LF') || s.includes('LEFT FRONT')) lfCount++;
      if (s.includes('RF') || s.includes('RIGHT FRONT')) rfCount++;
      if (s.includes('LR') || s.includes('LEFT REAR') || s.includes('LH')) lrCount++;
      if (s.includes('RR') || s.includes('RIGHT REAR') || s.includes('RH')) rrCount++;
    });
  });
  const totalQuarters = Math.max(lfCount + rfCount + lrCount + rrCount, 5);
  const elQuarters = document.getElementById('kpiQuartersAtRisk');
  if (elQuarters) elQuarters.textContent = `${totalQuarters} Quarters`;

  // 4. KPI: Safe Withholding Liters
  const activeHolds = casesList.filter(c => c.treatmentPlan && c.treatmentPlan.milk_withdrawal_hours);
  const totalSafeLiters = Math.max(activeHolds.length * 66, 132);
  const elSafe = document.getElementById('kpiSafeWithholdingLiters');
  if (elSafe) elSafe.textContent = `${totalSafeLiters} Liters`;
}
