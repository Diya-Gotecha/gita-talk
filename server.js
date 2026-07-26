const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;
// Paste your OpenRouter API Key here for local testing!
const API_KEY = process.env.OPENROUTER_API_KEY || '';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);

  // Handle the secure API backend route!
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        
        const options = {
          hostname: 'openrouter.ai',
          path: '/api/v1/chat/completions',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://gitatalk.app',
            'X-Title': 'Gita Talk'
          }
        };

        const proxyReq = https.request(options, (proxyRes) => {
          let proxyData = '';
          proxyRes.on('data', chunk => proxyData += chunk);
          proxyRes.on('end', () => {
            res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(proxyData);
          });
        });

        proxyReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: { message: e.message } }));
        });

        proxyReq.write(JSON.stringify({
          model: payload.model || 'google/gemma-4-26b-a4b-it:free',
          messages: payload.messages,
          max_tokens: 700,
          temperature: 0.72
        }));
        
        proxyReq.end();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: err.message } }));
      }
    });
    return;
  }

  // Serve Static Files (index.html, images, audio)
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('=========================================');
  console.log(`✨ Local Dev Server is running!`);
  console.log(`👉 Open http://localhost:${PORT} in your browser`);
  console.log('=========================================');
});
