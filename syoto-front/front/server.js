const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

 //SSL sertifika yapılandırması
const httpsOptions = {
  key: fs.readFileSync('/home/ubuntu/bbsm-garage/front/domain.key'),
  cert: fs.readFileSync('/home/ubuntu/bbsm-garage/front/wwwsyotomotivcom.crt'),
};

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

  // HTTPS sunucusunu başlat
  https.createServer(httpsOptions, server).listen(443, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:443');
  });
}); 
