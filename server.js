const express = require('express');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 10000;

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Referer': 'https://pl.buzkora.online/albaplayer/1bein1/?serv=0',
    'Origin': 'https://pl.buzkora.online',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  };

  request.get({ url: targetUrl, headers })
    .on('error', (err) => res.status(500).send('Proxy error: ' + err.message))
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(Proxy server running on port ${PORT});
});