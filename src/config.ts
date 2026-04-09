/**
 * URL loaded in the in-app browser.
 * Override for local dev, e.g. create `.env` with:
 *   EXPO_PUBLIC_NUMEE_URL=https://xxxx.ngrok-free.app
 */
export const NUMEE_WEB_URL =
  process.env.EXPO_PUBLIC_NUMEE_URL ?? "https://numee.vercel.app";
