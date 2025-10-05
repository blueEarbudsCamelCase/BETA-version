# BETA-version

This repository contains a small frontend and a proxy server used to fetch iCal
feeds from Canvas and serve them to the browser.

Local development

- Install dependencies: `npm install`
- Start the server: `npm start` (defaults to port 4000)

Render / production

If you deploy the proxy to Render, you can temporarily enable verbose
proxy debugging by setting the environment variable `DEBUG_PROXY=1` on the
service. This makes the server include stack traces in responses and logs
so you can debug 500 errors. Turn it off when done.
# BETA-version