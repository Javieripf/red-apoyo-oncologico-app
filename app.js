import express from 'express';
import cors from 'cors';
import { getConfig } from './config/env.js';
import { query } from './config/db.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { auth } from './routes/authRoutes.js';
import { resources } from './routes/resourceRoutes.js';
import { domain } from './routes/domainRoutes.js';
import { asyncHandler, success, HttpError, errorHandler } from './utils/http.js';

export const app = express();
const { origins } = getConfig();
app.disable('x-powered-by');
app.use(cors({ origin: (origin, done) => !origin || origins.includes(origin) ? done(null, true) : done(new HttpError(403,'Origen no permitido.','ORIGEN_PROHIBIDO')), methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'], allowedHeaders:['Content-Type','Authorization'] }));
app.use(express.json({limit:'100kb'}));
app.get('/api/health', asyncHandler(async (req,res) => {
  await query('SELECT 1');
  success(res, { status:'ok', database:'connected' });
}));
app.use('/api/auth', auth);
app.use('/api/recursos', requireAuth, resources);
app.use('/api', requireAuth, domain);
app.use((req,res,next) => next(new HttpError(404,'Ruta no encontrada.','NO_ENCONTRADO')));
app.use(errorHandler);
