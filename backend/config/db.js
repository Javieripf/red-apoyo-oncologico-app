import pg from 'pg';
import { getConfig } from './env.js';

export const pool = new pg.Pool({ connectionString: getConfig().databaseUrl, max: 10, connectionTimeoutMillis: 5000 });
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
