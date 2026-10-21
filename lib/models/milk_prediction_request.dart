class MilkPredictionRequest {
  final double milkTemperature;
  final double milkPh;
  final double milkConductivity;
  final double somaticCellCount;
  final double milkYield;

  const MilkPredictionRequest({
    required this.milkTemperature,
    required this.milkPh,
    required this.milkConductivity,
    required this.somaticCellCount,
    required this.milkYield,
  });

  Map<String, dynamic> toJson() {
    return {
      'milk_temperature': milkTemperature,
      'milk_ph': milkPh,
      'milk_conductivity': milkConductivity,
      'somatic_cell_count': somaticCellCount,
      'milk_yield': milkYield,
    };
  }

  factory MilkPredictionRequest.fromJson(Map<String, dynamic> json) {
    return MilkPredictionRequest(
      milkTemperature: (json['milk_temperature'] as num).toDouble(),
      milkPh: (json['milk_ph'] as num).toDouble(),
      milkConductivity: (json['milk_conductivity'] as num).toDouble(),
      somaticCellCount: (json['somatic_cell_count'] as num).toDouble(),
      milkYield: (json['milk_yield'] as num).toDouble(),
    );
  }
}
