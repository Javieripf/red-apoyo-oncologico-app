import pg from 'pg';
import { getConfig } from './env.js';

const config = getConfig();
export const pool = new pg.Pool({
  ...(config.databaseUrl ? { connectionString: config.databaseUrl } : {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'red_apoyo',
  }),
  max: 10,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});
export const query = (sql, args = []) => pool.query(sql, args);

export async function transaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const value = await fn(client);
    await client.query('COMMIT');
    return value;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}
