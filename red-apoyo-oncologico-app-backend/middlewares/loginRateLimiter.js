import { HttpError } from '../utils/http.js';


export function createLoginRateLimiter({ maxAttempts = 10, windowMs = 15 * 60 * 1000, now = Date.now } = {}) {
  const attempts = new Map();
  return (req, res, next) => {
    const time = now();
    for (const [key, record] of attempts) if (record.expiresAt <= time) attempts.delete(key);
    const key = req.ip || req.socket?.remoteAddress || 'unknown';
    const record = attempts.get(key);
    if (record && record.count >= maxAttempts)
      return next(new HttpError(429, 'Demasiados intentos. Intenta más tarde.', 'INTENTOS_EXCEDIDOS'));
    res.once('finish', () => {
      if (res.statusCode !== 401) return;
      const recent = attempts.get(key);
      if (!recent || recent.expiresAt <= now()) attempts.set(key, { count: 1, expiresAt: now() + windowMs });
      else recent.count += 1;
    });
    next();
  };
}
export const loginRateLimiter = createLoginRateLimiter();
