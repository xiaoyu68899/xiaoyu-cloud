const { get, put } = require('@vercel/blob');

const BLOB_KEY = 'xiaoyu-data.json';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      try {
        const blob = await get(BLOB_KEY);
        const text = await blob.text();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.status(200).send(text);
      } catch (e) {
        return res.status(200).json({
          updatedAt: new Date().toISOString(),
          data: {}
        });
      }
    }

    if (req.method === 'PUT') {
      const body = await parseBody(req);

      await put(BLOB_KEY, JSON.stringify(body), {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true
      });

      return res.status(200).json({
        ok: true,
        updatedAt: new Date().toISOString()
      });
    }

    return res.status(405).json({
      error: 'Method not allowed'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
};
