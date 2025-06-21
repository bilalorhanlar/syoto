const fs = require('fs');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // API rotaları buraya eklenebilir
  server.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Tüm diğer istekleri Next.js'e yönlendir
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Geliştirme ortamında HTTP, production'da HTTPS kullan
  if (dev) {
    // Geliştirme ortamı - HTTP
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  } else {
    // Production ortamı - HTTPS (SSL sertifikaları varsa)
    try {
      const https = require('https');
      const httpsOptions = {
        key: fs.readFileSync('/home/ubuntu/bbsm-garage/front/domain.key'),
        cert: fs.readFileSync('/home/ubuntu/bbsm-garage/front/wwwsyotomotivcom.crt'),
      };
      
      https.createServer(httpsOptions, server).listen(443, (err) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:443');
      });
    } catch (error) {
      console.log('SSL sertifikaları bulunamadı, HTTP kullanılıyor...');
      server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
      });
    }
  }
}); 
