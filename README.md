# Dictionary Maker

Small React app that looks up English word definitions and plays pronunciation audio from dictionaryapi.dev.

## Features
- Search English words and view definitions, phonetics, meanings, synonyms and source URL.
- Play/pause pronunciation audio with a single shared audio instance.
- Light / dark theme toggle and font selection (Serif, Sans, Mono).

## Project Demo
Click here to see the demo- https://github.com/simrannabilalnaik/Dictionary_Web_App_React/blob/main/src/assets/Project%20Demo.mp4

## Prerequisites
- Node.js (>=14) and npm or yarn
- Windows (commands below use npm; works the same on other OSes)

## Installgitgit
Open a terminal in the project root (`c:\Reactproject\dictionarymaker`) and run:

PowerShell / CMD:
```ps1
npm install
```

## Run (development)
```ps1
npm start
```
This runs the app in development mode. Open http://localhost:3000 in a browser.

## Build (production)
```ps1
npm run build
```
Build output goes to `build/`.

## How to use
- Type a word in the search box and click the search icon.
- If audio is available, a play button appears next to the word. Click to play/pause.
- The UI updates the play/pause icon automatically when audio plays, pauses or ends.

## Notes for developers
- Main component: `src/App.tsx`.
- Audio handling uses a single `HTMLAudioElement` instance (ref + effect) so playback state (`toggle`) is driven by audio events (`play`, `pause`, `ended`). This avoids creating multiple Audio objects and ensures `toggle` is set to `false` when playback completes.
- Styling: `src/App.css`.
- Assets: `src/assets/` (play/pause svg).

## Troubleshooting
- If audio doesn't play, check browser autoplay/security settings and that the audio URL is reachable.
- If fetch fails, confirm network access to `https://api.dictionaryapi.dev`.

## License
[MIT](https://github.com/simrannabilalnaik/Dictionary_Web_App_React/blob/main/LICENSE)
