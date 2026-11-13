import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { listDiary, addDiary, editDiary, deleteDiary, listDirectory, locateDirectoryCity, addDirectory, editDirectory, deleteDirectory, listFavorites, addFavorite, removeFavorite, getMetrics } from '../controllers/domainController.js';

export const domain = Router();
domain.get('/bitacora', requireAuth, requireRole('usuario'), listDiary);
domain.post('/bitacora', requireAuth, requireRole('usuario'), addDiary);
domain.patch('/bitacora/:id', requireAuth, requireRole('usuario'), editDiary);
domain.delete('/bitacora/:id', requireAuth, requireRole('usuario'), deleteDiary);
domain.get('/directorio', requireAuth, listDirectory);
domain.get('/directorio/:id/ubicacion', requireAuth, locateDirectoryCity);
domain.post('/directorio', requireAuth, requireRole('administrador'), addDirectory);
domain.put('/directorio/:id', requireAuth, requireRole('administrador'), editDirectory);
domain.delete('/directorio/:id', requireAuth, requireRole('administrador'), deleteDirectory);
domain.get('/favoritos', requireAuth, requireRole('usuario'), listFavorites);
domain.post('/favoritos/:id', requireAuth, requireRole('usuario'), addFavorite);
domain.delete('/favoritos/:id', requireAuth, requireRole('usuario'), removeFavorite);
domain.get('/metricas', requireAuth, requireRole('administrador'), getMetrics);
