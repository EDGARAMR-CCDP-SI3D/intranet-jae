import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardar la base de datos en la raíz de la carpeta del proyecto para que esté visible y segura (en local)
const DB_PATH = path.join(__dirname, '..', 'database.json');
const PORT = process.env.PORT || 3000;

const useCloudDb = !!process.env.DATABASE_URL;
let pool = null;

if (useCloudDb) {
  console.log('==================================================');
  console.log('Iniciando conexión a base de datos Neon (PostgreSQL)...');
  console.log('==================================================');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Asegurar que la tabla existe
  const initDb = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS app_state (
          id INT PRIMARY KEY,
          data JSONB
        );
      `);
      console.log('Tabla app_state verificada en Neon.');
    } catch (err) {
      console.error('Error al inicializar la tabla de base de datos en Neon:', err);
    }
  };
  initDb();
} else {
  console.log('Ruta de base de datos persistente (Local):', DB_PATH);
}

const server = http.createServer((req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API para leer y escribir datos de la Intranet JAE
  if (req.url === '/api/data') {
    if (req.method === 'GET') {
      if (useCloudDb) {
        pool.query('SELECT data FROM app_state WHERE id = 1')
          .then(result => {
            if (result.rows.length > 0) {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify(result.rows[0].data));
            } else {
              // Si no existe fila con id = 1, retornamos vacío
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ empty: true }));
            }
          })
          .catch(err => {
            console.error('Error al leer de la base de datos Neon:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error al leer la base de datos en la nube' }));
          });
      } else {
        try {
          if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(data);
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ empty: true }));
          }
        } catch (err) {
          console.error('Error al leer base de datos local:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al leer la base de datos' }));
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
            console.log(`[${new Date().toLocaleTimeString()}] Base de datos en Neon guardada con éxito (${body.length} bytes)`);
          } else {
            fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), 'utf8');
            console.log(`[${new Date().toLocaleTimeString()}] Base de datos local guardada con éxito (${body.length} bytes)`);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          console.error('Error al guardar base de datos:', err);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'JSON inválido o error de escritura' }));
        }
      });
    }
  } else if (req.url.startsWith('/api/upload')) {
    if (req.method === 'POST') {
      try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const filename = url.searchParams.get('filename') || 'upload_' + Date.now();
        const uploadsDir = path.join(__dirname, 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, filename);
        const fileStream = fs.createWriteStream(filePath);
        req.pipe(fileStream);
        req.on('end', () => {
          console.log(`[${new Date().toLocaleTimeString()}] Archivo subido con éxito: ${filename}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, path: `/uploads/${filename}` }));
        });
      } catch (err) {
        console.error('Error al subir archivo:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error en la subida del archivo' }));
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================`);
  console.log(`Servidor API JAE activo en puerto ${PORT}`);
  console.log(`Modo de almacenamiento: ${useCloudDb ? 'Neon Cloud (PostgreSQL)' : 'Local JSON File'}`);
  console.log(`==================================================`);
});
