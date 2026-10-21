import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'models/milk_prediction_request.dart';
import 'models/milk_prediction_response.dart';

class BoviCareApiService {
  String baseUrl;
  final Duration timeout;

  BoviCareApiService({
    this.baseUrl = 'http://127.0.0.1:8000',
    this.timeout = const Duration(seconds: 5),
  });

  /// Check if the backend inference service is reachable
  Future<bool> checkHealth() async {
    try {
      final uri = Uri.parse('$baseUrl/health');
      final response = await http.get(uri).timeout(timeout);
      return response.statusCode == 200;
    } catch (_) {
      return false;
    }
  }

  /// Run tabular mastitis prediction via the Python/FastAPI service
  Future<MilkPredictionResponse> predict(MilkPredictionRequest request) async {
    final uri = Uri.parse('$baseUrl/predict');

    try {
      final response = await http
          .post(
            uri,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(request.toJson()),
          )
          .timeout(timeout);

      if (response.statusCode != 200) {
        throw Exception('API error (${response.statusCode}): ${response.body}');
      }

      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return MilkPredictionResponse.fromJson(data);
    } on TimeoutException {
      throw Exception('Connection timeout. Please verify that the FastAPI backend is running at $baseUrl');
    } catch (e) {
      if (e.toString().contains('Connection refused') || e.toString().contains('Failed to fetch')) {
        throw Exception('Cannot reach inference server at $baseUrl. Ensure uvicorn is running.');
      }
      rethrow;
    }
  }

  /// Backward-compatible predict method accepting individual values
  Future<Map<String, dynamic>> predictRaw({
    required double milkTemperature,
    required double milkPh,
    required double milkConductivity,
    required double somaticCellCount,
    required double milkYield,
  }) async {
    final request = MilkPredictionRequest(
      milkTemperature: milkTemperature,
      milkPh: milkPh,
      milkConductivity: milkConductivity,
      somaticCellCount: somaticCellCount,
      milkYield: milkYield,
    );

    final res = await predict(request);
    return res.toJson();
  }
}
