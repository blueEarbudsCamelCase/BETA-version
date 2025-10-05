const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2929

// If DEBUG_PROXY is set, the server will include error stacks in responses
// and more verbose console logging. Do NOT enable in public production.
const DEBUG_PROXY = process.env.DEBUG_PROXY === '1';

app.use(cors());

// Serve static files with cache headers
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  }
}));

// Proxy route for fetching iCal feed
app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  // Only allow URLs from canvas.na.oneschoolglobal.com
  const allowedDomain = "canvas.oneschoolglobal.com";
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== allowedDomain) {
      return res.status(403).send("Forbidden: Domain not allowed.");
    }
  } catch (e) {
    return res.status(400).send("Invalid URL.");
  }

  if (!url) {
    return res.status(400).send("Missing 'url' query parameter.");
  }

  try {
    const response = await fetch(url);
    console.log(`[proxy] fetched ${url} -> ${response.status} ${response.statusText}`);
    if (!response.ok) {
      const text = await response.text().catch(() => '<non-text body>');
      console.error('[proxy] upstream non-ok:', response.status, text);
      return res.status(502).send('Upstream fetch returned ' + response.status);
    }

    // Try to stream response body if available
    try {
      const data = await response.blob();
      res.type(data.type || 'text/plain');
      res.send(Buffer.from(await data.arrayBuffer()));
    } catch (streamErr) {
      console.error('[proxy] error streaming upstream body:', streamErr);
      if (DEBUG_PROXY) {
        return res.status(500).send('Proxy error: ' + (streamErr && streamErr.stack ? streamErr.stack : String(streamErr)));
      }
      return res.status(500).send('Proxy error');
    }
  } catch (error) {
    console.error("Error fetching iCal feed: ", error && error.stack ? error.stack : error);
    if (DEBUG_PROXY) {
      res.status(500).send("Failed to fetch iCal feed: " + (error && error.stack ? error.stack : String(error)));
    } else {
      res.status(500).send("Proxy error");
    }
  }
});

// Catch-all route to serve the frontend for any other request
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server with improved error handling
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// More helpful error handling for common startup errors
server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. (EADDRINUSE)`);
    console.error('Find the process using the port with: lsof -i :' + PORT + '  (or: ss -ltnp | grep :' + PORT + ')');
    console.error('Then stop it (for example): kill <pid>  or  kill -9 <pid>');
    process.exit(1);
  }
  console.error('Server error on startup:', err && err.stack ? err.stack : err);
  process.exit(1);
});
