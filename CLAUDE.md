# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

No test runner or linter is configured.

## Purpose

A single-page React app that renders a full-screen Instagram Story-style winner card (9:16 ratio) designed to be embedded in a React Native `WebView` and screenshotted via `react-native-view-shot`.

## Share flow

1. User taps the share button (top-right corner of `App.jsx`)
2. Button hides immediately via `useState` → `requestAnimationFrame` ensures the DOM update paints before `postMessage` fires, so `react-native-view-shot` captures a clean card with no button
3. `window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share' }))` signals the RN side to take the screenshot
4. In-browser fallback: logs to console and re-shows the button after 2 s

## React Native integration

```jsx
<WebView
  source={{ uri: 'https://your-deployed-url.com/' }}
  onMessage={(event) => {
    const { type } = JSON.parse(event.nativeEvent.data)
    if (type === 'share') {
      // screenshot WebView with react-native-view-shot
    }
  }}
/>
```

## Customization

| File | What to change |
|---|---|
| `src/App.jsx` | Winner name, prize text, card copy |
| `public/car.svg` | Prize image — swap for `.png`/`.jpg` if needed |
| `src/index.css` | Colors, fonts, layout |

The `index.html` sets `viewport` with `maximum-scale=1, user-scalable=no` and `apple-mobile-web-app-capable` so the card fills the WebView without scrollbars or zoom.
