# Quest Home Switcher · Library shortcut

A small, separate launcher page for Meta Quest Browser:
**https://nikitat21.github.io/QHS-Shortcut/**

Open the page on a Quest, use the browser's Library shortcut option and confirm.
The compact guide shows **⋮ Browser menu → Add shortcut to library → Add**.
**Where is it?** expands an accessible illustration of those three steps;
it is not an interactive browser menu and does not draw over browser controls.
The guide works without JavaScript. Browser labels and positions can vary.
In a Library/standalone window, the same URL becomes a focused launcher: the
original logo, app name and **Open QHS**, with **Help & setup** available below.
The browser's `display-mode` controls this entirely in CSS; no tracking,
local-storage flag, automatic app launch or install-detection guess is needed.
Ordinary browser tabs keep the setup instructions. Existing saved shortcuts keep
their URL, manifest ID and icon. **Help & setup -> Shortcut setup** reveals the
instructions in a Library window too; **Back to launcher** hides them again.
The saved shortcut opens this page; **Open QHS** then launches the installed app.
Browser confirmation may be required. QHS **2.1.6-rc.2 or newer** is needed for
the native launch link. This page does not install or update the Android app.

The existing QHS logo has faithful 192- and 512-pixel exports for the favicon
and web manifest, plus a centered 16:9 preview for wide cards. No brand redesign.
It is intentionally declared as an ordinary (`any`) icon,
not `maskable`: the browser must not assume the artwork is safe to crop.
The final Library tile layout is controlled by Meta Quest Browser / Horizon OS.

## Scope

This repository contains only this static website and its logo. No APKs,
Home assets, library catalogues, update feeds, accounts, tokens or analytics.
No changes to system settings and no Root / ADB access are performed here.
This is a browser-created shortcut, not a Meta Store listing or endorsement.

The service worker optionally caches these static files after the first visit.
Offline availability depends on browser storage; deleting the browser's data
also deletes the cached page. It never reads or caches QHS's native app data.
GitHub Pages handles ordinary hosting requests under GitHub's privacy policy.

## Development

Buildless HTML, CSS and JavaScript. Serve this directory on localhost for local
testing; service workers require HTTPS or localhost. No npm dependencies.
The `main` branch is served from `/` by GitHub Pages. When changing cached
website files, increment the cache version in `sw.js` as part of the same update.

Keep the Android scheme/package and web origin synchronized with the app's
`LibraryShortcut` contract. The page never accepts a package or intent from URL
parameters. Native launch requires a user gesture; there is no redirect loop.
