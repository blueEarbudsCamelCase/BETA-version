Auto-zoom behaviour

- The app attempts to auto-zoom the page to 80% if the "Save Schedule" button is not visible in the schedule setup form; this is a best-effort change and works in many browsers using non-standard APIs.
- If auto-zoom cannot be applied, the UI will show a small banner on the schedule setup panel prompting users to zoom out with an "Auto Zoom" button to apply it manually or a "Dismiss" button to opt out.
- If you want to reset zoom, open Settings and click the new "Reset Zoom" button. This disables any further auto-zoom attempts until you clear browser local storage for the site.

Dashboard layout

- The two main Dashboard cards (Schedule / Bookings and Tasks) now expand to fill the available viewport both horizontally and vertically. If you have a wide screen, they'll sit side-by-side and stretch to fit the height; on smaller screens, they'll stack.

Manual test for layout:

1. Start the dev server: `npm start`.
2. Open the app at http://localhost:2929/.
3. The Dashboard should show two large panes: the left hosting Bookings/Schedule and the right hosting Tasks. They should both fill the viewport vertically and horizontally across the page.

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
