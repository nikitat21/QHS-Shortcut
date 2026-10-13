'use strict';

// Native launch is a real link, never a timer or an automatic redirect. Browsers
// may require a user gesture and/or confirmation before opening another app.
function revealLaunchHelp() {
  if (window.location.hash === '#help') document.getElementById('help').open = true;
}
revealLaunchHelp();
window.addEventListener('hashchange', revealLaunchHelp);

// Optional offline caching. Blocking workers or clearing browser data must not
// prevent the online page and its ordinary Open QHS link from working.
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' })
      .catch(() => { /* Browser settings can disable offline storage. */ });
  });
}
