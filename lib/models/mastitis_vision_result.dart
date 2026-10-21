class MastitisVisionResult {
  final bool success;
  final double mastitisProbability; // 0.0 to 1.0 (1.0 - rawNormalScore)
  final double normalProbability; // 0.0 to 1.0 (raw output from sigmoid)
  final String riskTier; // 'Low', 'Moderate', 'High'
  final String label; // 'Mastitis Indicated' or 'Healthy / Normal'
  final String modelArchitecture; // 'MobileNetV2 (1.00_224)'
  final String recommendation;
  final String disclaimer;

  const MastitisVisionResult({
    required this.success,
    required this.mastitisProbability,
    required this.normalProbability,
    required this.riskTier,
    required this.label,
    required this.modelArchitecture,
    required this.recommendation,
    this.disclaimer = 'Experimental AI screening tool. Not a substitute for professional veterinary clinical diagnosis.',
  });

  factory MastitisVisionResult.fromScore(double rawSigmoidScore, {String architecture = 'MobileNetV2 (1.00_224)'}) {
    // In training dataset: class 0 = Mastitis, class 1 = Normal
    // Sigmoid outputs probability of class 1 (Normal)
    final normalProb = rawSigmoidScore.clamp(0.0, 1.0);
    final mastitisProb = (1.0 - normalProb).clamp(0.0, 1.0);

    String tier;
    String labelText;
    String recText;

    if (mastitisProb >= 0.65) {
      tier = 'High';
      labelText = 'Mastitis Indicated';
      recText = 'Visible inflammation or discoloration detected. Isolate milk and request veterinarian review.';
    } else if (mastitisProb >= 0.35) {
      tier = 'Moderate';
      labelText = 'Borderline / Monitor';
      recText = 'Subtle signs observed. Re-screen foremilk and check quarter temperature.';
    } else {
      tier = 'Low';
      labelText = 'Healthy / Normal';
      recText = 'Normal udder presentation. Maintain standard pre-milking sanitization.';
    }

    return MastitisVisionResult(
      success: true,
      mastitisProbability: mastitisProb,
      normalProbability: normalProb,
      riskTier: tier,
      label: labelText,
      modelArchitecture: architecture,
      recommendation: recText,
    );
  }
}
