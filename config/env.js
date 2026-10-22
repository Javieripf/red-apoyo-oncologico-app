import 'dotenv/config';

export function getConfig() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('Configura JWT_SECRET (mínimo 32 caracteres) en .env');
  if (!process.env.DATABASE_URL) throw new Error('Configura DATABASE_URL en .env');
  return {
    port: Number(process.env.PORT || 3000),
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: secret,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
    origins: (process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',').map(x => x.trim()),
  };
}
