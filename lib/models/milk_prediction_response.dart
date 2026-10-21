class MilkPredictionResponse {
  final bool success;
  final String prediction; // 'Mastitis' or 'Normal'
  final double confidence; // 0.0 to 1.0
  final String riskTier; // 'Low', 'Moderate', 'High'
  final String recommendation;
  final String source; // 'Random Forest Model' or 'Clinical Screening Rules'

  const MilkPredictionResponse({
    required this.success,
    required this.prediction,
    required this.confidence,
    required this.riskTier,
    required this.recommendation,
    required this.source,
  });

  factory MilkPredictionResponse.fromJson(Map<String, dynamic> json) {
    return MilkPredictionResponse(
      success: json['success'] as bool? ?? true,
      prediction: json['prediction'] as String? ?? 'Unknown',
      confidence: (json['confidence'] as num?)?.toDouble() ?? 0.0,
      riskTier: json['risk_tier'] as String? ?? 'Moderate',
      recommendation: json['recommendation'] as String? ?? 'Consult licensed veterinarian.',
      source: json['source'] as String? ?? 'BoviCare Model',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'prediction': prediction,
      'confidence': confidence,
      'risk_tier': riskTier,
      'recommendation': recommendation,
      'source': source,
    };
  }
}
