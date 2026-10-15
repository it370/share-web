const SCHEME = 'sinlung';

/** @param {string} segment @param {string} id */
function appUrl(segment, id) {
  const enc = encodeURIComponent(String(id));
  return `${SCHEME}:///${segment}/${enc}`;
}

function landingHtml({ httpsUrl, appLink, label }) {
  const safeHttps = httpsUrl.replace(/"/g, '&quot;');
  const safeApp = appLink.replace(/"/g, '&quot;');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${label} · Sinlung Tech</title>
  <meta property="og:title" content="${label}" />
  <meta property="og:site_name" content="Sinlung Tech" />
  <style>
    body { font-family: system-ui, sans-serif; background: #07080F; color: #fff; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { max-width: 420px; text-align: center; }
    a.btn { display: inline-block; margin-top: 16px; padding: 14px 28px; background: #7C5CFF; color: #fff; text-decoration: none; border-radius: 999px; font-weight: 600; }
    p { color: #B6BAD0; line-height: 1.5; font-size: 15px; }
    code { display: block; margin-top: 12px; padding: 10px; background: #11131f; border-radius: 8px; font-size: 12px; word-break: break-all; color: #e8e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${label}</h1>
    <p>Open in the Sinlung Tech app to watch, shop, or follow.</p>
    <a class="btn" href="${safeApp}">Open in app</a>
    <p style="font-size: 13px; margin-top: 20px">Share this link:</p>
    <code>${safeHttps}</code>
  </div>
</body>
</html>`;
}

const SEGMENTS = {
  t: { seg: 't', label: 'Premium title' },
  r: { seg: 'r', label: 'Reel' },
  p: { seg: 'p', label: 'Product' },
  c: { seg: 'c', label: 'Creator' },
};

/** @param {import('@vercel/node').VercelRequest} req */
/** @param {import('@vercel/node').VercelResponse} res */
export default function handler(req, res) {
  const kind = String(req.query.kind ?? '');
  const id = String(req.query.id ?? '');
  const meta = SEGMENTS[kind];
  if (!meta || !id) {
    res.status(404).setHeader('Content-Type', 'text/plain').end('Not found');
    return;
  }
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'sinlung-share.vercel.app';
  const proto = req.headers['x-forwarded-proto'] === 'http' ? 'http' : 'https';
  const httpsUrl = `${proto}://${host}/${kind}/${encodeURIComponent(id)}`;
  const appLink = appUrl(meta.seg, id);
  res
    .status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .end(landingHtml({ httpsUrl, appLink, label: meta.label }));
}
