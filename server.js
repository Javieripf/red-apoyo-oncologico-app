import { app } from './app.js';
import { pool } from './config/db.js';
import { getConfig } from './config/env.js';

const { port } = getConfig();
try {
  await pool.query('SELECT 1');
  app.listen(port, () => console.log(`API lista en http://localhost:${port}/api`));
} catch (err) {
  console.error('No se pudo conectar a PostgreSQL. Revisa DATABASE_URL y ejecuta el SQL:',err.message);
  await pool.end();
  process.exitCode=1;
}
