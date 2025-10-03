const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Allow cors from your hosted origin (or use cors package)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://beta-studyplanner.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing 'url' query parameter.");
  try {
    const parsed = new URL(url);
    const allowed = 'canvas.oneschoolglobal.com';
    if (parsed.hostname !== allowed) return res.status(403).send('Forbidden: Domain not allowed.');
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).send(response.statusText);
    const buf = Buffer.from(await response.arrayBuffer());
    res.set('Content-Type', response.headers.get('content-type') || 'text/plain');
    res.send(buf);
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

exports.proxy = functions.https.onRequest(app);