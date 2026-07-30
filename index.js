const { get, put } = require('@vercel/blob');

const BLOB_KEY = 'xiaoyu-data.json';

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch(e) { resolve({}); }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      try {
        const blob = await get(BLOB_KEY);
        const text = await blob.text();
        return res.json(JSON.parse(text));
      } catch {
        return res.json({ updatedAt: new Date().toISOString(), data: {} });
      }
    }

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      await put(BLOB_KEY, JSON.stringify(body), {
        access: 'public',
        contentType: 'application/json',
      });
      return res.json({ ok: true, updatedAt: new Date().toISOString() });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
