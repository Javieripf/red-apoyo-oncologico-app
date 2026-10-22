import { Router } from 'express';
import { requireRole } from '../middlewares/authMiddleware.js';
import { listDiary, addDiary, listDirectory, listFavorites, addFavorite, removeFavorite, getMetrics } from '../controllers/domainController.js';

export const domain = Router();
domain.get('/bitacora', requireRole('usuario'), listDiary);
domain.post('/bitacora', requireRole('usuario'), addDiary);
domain.get('/directorio', requireRole('usuario'), listDirectory);
domain.get('/favoritos', requireRole('usuario'), listFavorites);
domain.post('/favoritos/:id', requireRole('usuario'), addFavorite);
domain.delete('/favoritos/:id', requireRole('usuario'), removeFavorite);
domain.get('/metricas', requireRole('administrador'), getMetrics);
