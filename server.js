// Lightweight, zero-dependency local static server for BoviCare
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Simple zero-dependency .env loader for local development
const envPath = path.join(PUBLIC_DIR, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (e) {
    // Ignore .env read errors
  }
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const reqPath = decodeURI(req.url.split('?')[0]);

  // Dynamic runtime configuration endpoint (Centralized publishable config)
  if (reqPath === '/env-config.js') {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.BOVICARE_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.BOVICARE_SUPABASE_ANON_KEY || '';
    const configJs = `// Auto-generated runtime environment configuration
window.ENV_SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
window.ENV_SUPABASE_ANON_KEY = ${JSON.stringify(supabaseAnonKey)};
`;
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(configJs, 'utf-8');
    return;
  }

  // Bhashini Language & Voice Services Proxy (Protects private keys on server side)
  if (reqPath === '/api/bhashini/config' && req.method === 'GET') {
    const isConfigured = Boolean(process.env.BHASHINI_API_KEY && process.env.BHASHINI_USER_ID);
    const configData = {
      success: true,
      configured: isConfigured,
      supportedLanguages: [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' }
      ],
      supportedPairs: ['en-mr', 'mr-en', 'en-hi', 'hi-en', 'mr-hi', 'hi-mr'],
      speechLocales: {
        en: 'en-IN',
        mr: 'mr-IN',
        hi: 'hi-IN'
      },
      services: {
        translation: true,
        speechRecognition: true,
        textToSpeech: true
      },
      notice: isConfigured
        ? 'Bhashini National Language Translation Mission API is active.'
        : 'Running in high-performance localized mode with browser speech synthesis & verified Indic terminology.'
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(configData));
    return;
  }

  if (reqPath === '/api/bhashini/translate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { text, sourceLang = 'en', targetLang = 'mr' } = payload;
        if (!text || typeof text !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Missing or invalid text parameter' }));
        }

        const validLangs = ['en', 'mr', 'hi'];
        if (!validLangs.includes(sourceLang) || !validLangs.includes(targetLang)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: `Unsupported language pair: ${sourceLang} -> ${targetLang}. Supported: en, mr, hi.` }));
        }

        if (sourceLang === targetLang) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, translatedText: text, sourceLang, targetLang }));
        }

        const apiKey = process.env.BHASHINI_API_KEY;
        const userId = process.env.BHASHINI_USER_ID;
        const pipelineId = process.env.BHASHINI_PIPELINE_ID;

        if (!apiKey || !userId) {
          // Graceful fallback to verified client-side dictionary
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            fallback: true,
            message: 'Bhashini server credentials not configured. Please utilize verified local Indic vocabulary.',
            sourceLang,
            targetLang
          }));
        }

        // Forward to official Bhashini Dhruva pipeline endpoint
        const https = require('https');
        const bhashiniReqBody = JSON.stringify({
          pipelineTasks: [
            {
              taskType: 'translation',
              config: {
                language: {
                  sourceLanguage: sourceLang,
                  targetLanguage: targetLang
                }
              }
            }
          ],
          inputData: {
            input: [{ source: text }]
          }
        });

        const bReq = https.request({
          hostname: 'dhruva-api.bhashini.gov.in',
          port: 443,
          path: '/services/inference/pipeline',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey,
            'userID': userId,
            'ulcaApiKey': process.env.BHASHINI_INFERENCE_API_KEY || apiKey
          },
          timeout: 8000
        }, (bRes) => {
          let bData = '';
          bRes.on('data', c => { bData += c; });
          bRes.on('end', () => {
            try {
              const bJson = JSON.parse(bData);
              const target = bJson?.pipelineResponse?.[0]?.output?.[0]?.target;
              if (target) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, translatedText: target, sourceLang, targetLang }));
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, fallback: true, raw: bJson }));
            } catch (err) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, fallback: true, error: err.message }));
            }
          });
        });

        bReq.on('error', (e) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, fallback: true, error: e.message }));
        });

        bReq.write(bhashiniReqBody);
        bReq.end();
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
      }
    });
    return;
  }

  // Local AI Mastitis Screening Endpoint (Protected, Local ONNX Runtime)
  if (req.method === 'POST' && reqPath === '/api/ai-screen') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const imgPath = payload.image_path || path.join(PUBLIC_DIR, 'asset', 'images', 'cow_assessment_banner.jpeg');
        const resolved = path.resolve(PUBLIC_DIR, imgPath);
        if (!resolved.startsWith(PUBLIC_DIR)) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Access denied: path outside project' }));
        }
        const { execFile } = require('child_process');
        execFile('python3', [path.join(PUBLIC_DIR, 'ml_inference.py'), resolved], (err, stdout) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(stdout);
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  let filePath = path.join(PUBLIC_DIR, reqPath);
  if (reqPath === '/' || reqPath === '/landing') {
    filePath = path.join(PUBLIC_DIR, 'landing.html');
  } else if (reqPath === '/login' || reqPath === '/signin') {
    filePath = path.join(PUBLIC_DIR, 'login.html');
  } else if (reqPath === '/app') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  } else if (reqPath === '/admin') {
    filePath = path.join(PUBLIC_DIR, 'admin.html');
  } else if (filePath === PUBLIC_DIR || filePath.endsWith('/')) {
    filePath = path.join(filePath, 'landing.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`BoviCare prototype running at http://localhost:${PORT}`);
});
