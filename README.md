Auto-zoom behaviour
- The app attempts to auto-zoom the page to 80% if the "Save Schedule" button is not visible in the schedule setup form; this is a best-effort change and works in many browsers using non-standard APIs.
- If auto-zoom cannot be applied, the UI will show a small banner on the schedule setup panel prompting users to zoom out with an "Auto Zoom" button to apply it manually or a "Dismiss" button to opt out.
- If you want to reset zoom, open Settings and click the new "Reset Zoom" button. This disables any further auto-zoom attempts until you clear browser local storage for the site.
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
