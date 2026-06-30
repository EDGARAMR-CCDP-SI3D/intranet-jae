import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Pool } = pg;

const DB_PATH = path.join(process.cwd(), 'database.json');
const useCloudDb = !!process.env.DATABASE_URL;

let pool = null;

if (useCloudDb) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      id INT PRIMARY KEY,
      data JSONB
    );
  `).catch(err => console.error('Error init Neon DB:', err));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    if (useCloudDb) {
      try {
        const result = await pool.query('SELECT data FROM app_state WHERE id = 1');
        if (result.rows.length > 0) {
          return res.status(200).json(result.rows[0].data);
        } else {
          return res.status(200).json({ empty: true });
        }
      } catch (err) {
        console.error('Error fetching from Neon DB:', err);
        return res.status(500).json({ error: 'Error fetching from Cloud DB' });
      }
    } else {
      try {
        if (fs.existsSync(DB_PATH)) {
          const data = fs.readFileSync(DB_PATH, 'utf8');
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.status(200).send(data);
        } else {
          return res.status(200).json({ empty: true });
        }
      } catch (err) {
        console.error('Error fetching from local DB:', err);
        return res.status(500).json({ error: 'Error fetching from local DB' });
      }
    }
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body);
        if (useCloudDb) {
          await pool.query(
            'INSERT INTO app_state (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1',
            [parsed]
          );
        } else {
          fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), 'utf8');
        }
        return res.status(200).json({ success: true });
      } catch (err) {
        console.error('Error saving DB:', err);
        return res.status(400).json({ error: 'Invalid JSON or write error' });
      }
    });
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}
