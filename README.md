# Sinlung share links (Vercel)

Minimal public host for share URLs only. No dependencies.

## URLs

| Path | Opens in app |
|------|----------------|
| `/t/:id` | `sinlung://title/:id` |
| `/r/:id` | `sinlung://r/:id` |
| `/p/:id` | `sinlung://p/:id` |
| `/c/:id` | `sinlung://c/:id` |

Matches `services/share-links.ts` when `EXPO_PUBLIC_WEB_ORIGIN` is this deployment’s origin.

## Deploy

1. In [Vercel](https://vercel.com), **Add project** → import this repo.
2. Set **Root Directory** to `share-web`.
3. Framework preset: **Other** (no build command).
4. Deploy.

## App config

In the Expo app `.env`:

```env
EXPO_PUBLIC_WEB_ORIGIN=https://your-project.vercel.app
```

Optional custom domain (e.g. `links.sinlung.com`) → same env value, no trailing slash.

## Local

```bash
npx vercel dev
```

(from this folder, with [Vercel CLI](https://vercel.com/docs/cli) installed)
