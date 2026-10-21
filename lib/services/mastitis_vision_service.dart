import 'package:flutter/foundation.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import '../models/mastitis_vision_result.dart';

class MastitisVisionService {
  static const String modelAssetPath = 'asset/models/bovicare_mastitis_model.tflite';
  Interpreter? _interpreter;
  bool _isInitialized = false;

  bool get isInitialized => _isInitialized;

  /// Initialize the TFLite interpreter
  Future<bool> initialize() async {
    if (kIsWeb) {
      debugPrint('MastitisVisionService: Web platform detected. Native TFLite interpreter not supported on Web.');
      return false;
    }

    try {
      _interpreter = await Interpreter.fromAsset(modelAssetPath);
      _isInitialized = true;
      debugPrint('MastitisVisionService: MobileNetV2 TFLite model loaded successfully.');
      return true;
    } catch (e) {
      debugPrint('MastitisVisionService init error: $e');
      _isInitialized = false;
      return false;
    }
  }

  /// Run inference on a 224x224 RGB image buffer
  /// Input tensor shape: [1, 224, 224, 3], float32
  /// Normalization applied: ((pixel / 127.5) - 1.0)
  Future<MastitisVisionResult> predictFromRgbBytes(Uint8List rgbBytes, {int width = 224, int height = 224}) async {
    if (!_isInitialized || _interpreter == null) {
      final initialized = await initialize();
      if (!initialized || _interpreter == null) {
        // Fallback for Flutter Web or unsupported environments:
        // Compute heuristic image analysis from average color and saturation
        return _fallbackAnalysis(rgbBytes, width, height);
      }
    }

    try {
      // Prepare 4D input tensor: [1, 224, 224, 3]
      final input = List.generate(
        1,
        (_) => List.generate(
          height,
          (y) => List.generate(
            width,
            (x) {
              final index = (y * width + x) * 3;
              if (index + 2 < rgbBytes.length) {
                final r = (rgbBytes[index] / 127.5) - 1.0;
                final g = (rgbBytes[index + 1] / 127.5) - 1.0;
                final b = (rgbBytes[index + 2] / 127.5) - 1.0;
                return [r, g, b];
              }
              return [0.0, 0.0, 0.0];
            },
          ),
        ),
      );

      // Output tensor: [1, 1]
      final output = List.filled(1, [0.0]);

      _interpreter!.run(input, output);
      final rawScore = output[0][0];

      return MastitisVisionResult.fromScore(rawScore);
    } catch (e) {
      debugPrint('TFLite inference error: $e. Falling back to rule-based vision assessment.');
      return _fallbackAnalysis(rgbBytes, width, height);
    }
  }

  /// Fallback analysis for Web / non-TFLite environments
  MastitisVisionResult _fallbackAnalysis(Uint8List rgbBytes, int width, int height) {
    if (rgbBytes.isEmpty) {
      return MastitisVisionResult.fromScore(0.5, architecture: 'BoviCare Heuristic Fallback');
    }

    // Inspect redness / discoloration ratio as a baseline heuristic
    int totalPixels = (rgbBytes.length / 3).floor();
    if (totalPixels == 0) totalPixels = 1;

    double redSum = 0;
    double greenSum = 0;
    double blueSum = 0;

    for (int i = 0; i < rgbBytes.length - 2; i += 3) {
      redSum += rgbBytes[i];
      greenSum += rgbBytes[i + 1];
      blueSum += rgbBytes[i + 2];
    }

    final avgRed = redSum / totalPixels;
    final avgGreen = greenSum / totalPixels;
    final avgBlue = blueSum / totalPixels;

    // Redness index (erythema)
    double redness = avgRed / (avgGreen + avgBlue + 1.0);
    double estimatedNormalScore = (1.2 - (redness * 0.5)).clamp(0.1, 0.95);

    return MastitisVisionResult.fromScore(
      estimatedNormalScore,
      architecture: kIsWeb ? 'Web Simulated Vision Screening' : 'BoviCare Local Vision Fallback',
    );
  }

  void dispose() {
    _interpreter?.close();
    _interpreter = null;
    _isInitialized = false;
  }
}
