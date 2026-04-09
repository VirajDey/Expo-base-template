# Expo base template

**Expo base template** — a starting point for shipping a web application as both:

1. **A browser-style experience in Expo** — run the same stack with `expo start --web` for local web development and testing.
2. **A native Android app (APK)** — wrap your site in a `WebView` shell so users install an APK while you keep iterating on the web app.

The default shell loads a configurable URL (see `src/config.ts`), shows a branded splash while the page loads, and handles Android back navigation inside the web content.

## What’s included

- **Expo SDK** (~54) with **React Native** and **react-native-webview**
- **`npm run web`** — Expo’s web target for developing or previewing alongside your web app
- **Android** — `expo prebuild` / Gradle scripts for a **debug APK** locally, plus **EAS Build** profiles for **APK** (preview) and **AAB** (production)

## Requirements

- **Node.js** (LTS recommended)
- For **Android builds on your machine**: Android Studio, JDK, and Android SDK (typical Expo / React Native setup)
- For **cloud APK/AAB builds**: [EAS](https://docs.expo.dev/build/introduction/) account and `eas-cli` (already a dev dependency)

## Quick start

```bash
cd numee-mobile
npm install
npm start
```

From the dev tools UI you can open **Android**, **iOS**, or **Web**. For web only:

```bash
npm run web
```

## Point the shell at your web app

The in-app browser URL comes from `src/config.ts`:

- Default: `https://numee.vercel.app`
- Override with **`EXPO_PUBLIC_NUMEE_URL`** (e.g. in a `.env` file or your shell) for staging or a local tunnel.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Expo dev server |
| `npm run web` | Start with **web** enabled |
| `npm run android` | Run on a device/emulator (`expo run:android`) |
| `npm run ios` | Run on iOS (`expo run:ios`) |
| `npm run prebuild:android` | Regenerate the `android/` project (`expo prebuild --clean`) |
| `npm run build:apk:debug` | Prebuild Android + assemble a **debug APK** via Gradle (Windows: `gradlew.bat`) |
| `npm run gradle:assembleDebug` | Assemble debug APK if `android/` already exists |
| `npm run build:apk:eas` | **EAS** Android build using the `preview` profile (**APK**) |

EAS profiles live in `eas.json`: **preview** builds an **APK** for internal distribution; **production** targets the Play Store as an **app bundle (AAB)**.

## Naming your app

This repo keeps example values in **`package.json`** and **`app.json`**. When you use it as a template for your own product, update them to match your app:

| File | What to change |
|------|----------------|
| **`package.json`** | `name` — npm package name (e.g. `my-app-shell`). |
| **`app.json`** | `expo.name` — label shown to users / in Expo. |
| **`app.json`** | `expo.slug` — URL-friendly project id for Expo (e.g. `my-app`). |
| **`app.json`** | `expo.android.package` — Android application id (reverse DNS, e.g. `com.company.myapp`). |
| **`app.json`** | Add or adjust `expo.ios.bundleIdentifier` if you ship on iOS. |

After changing `package.json` `name`, run `npm install` once so `package-lock.json` stays in sync.

## Using this as a template

1. Copy or fork this folder and apply the naming changes above.
2. Set `EXPO_PUBLIC_NUMEE_URL` (or edit `src/config.ts`) to your deployed web app.
3. Replace assets under `assets/` (icon, splash, loading logo) to match your brand.
4. Run **`npm run web`** while you build the web UI; use **`npm run build:apk:debug`** or **EAS** when you need an installable Android build.

This repo is intended as a **thin native wrapper** around a web app: most product logic stays on the web; Expo gives you web tooling and a path to **APK** (and iOS if you extend it the same way).
