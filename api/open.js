function appUrl(kind, id) {
  const enc = encodeURIComponent(String(id));
  switch (kind) {
    case 't':
      return `sinlung://title/${enc}`;
    case 'r':
      return `sinlung://r/${enc}`;
    case 'p':
      return `sinlung://p/${enc}`;
    case 'c':
      return `sinlung://c/${enc}`;
    default:
      return null;
  }
}

/** @param {import('@vercel/node').VercelRequest} req */
/** @param {import('@vercel/node').VercelResponse} res */
export default function handler(req, res) {
  const kind = String(req.query.kind ?? '');
  const id = String(req.query.id ?? '');
  const deep = appUrl(kind, id);
  if (!deep) {
    res.status(404).setHeader('Content-Type', 'text/plain').end('Not found');
    return;
  }
  const safe = deep.replace(/"/g, '&quot;');
  res
    .status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .end(
      `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Open Sinlung Tech</title><meta http-equiv="refresh" content="0;url=${safe}"></head><body style="font-family:system-ui;background:#07080F;color:#fff;text-align:center;padding:2rem"><p><a href="${safe}" style="color:#7C5CFF">Open in app</a></p></body></html>`,
    );
}
