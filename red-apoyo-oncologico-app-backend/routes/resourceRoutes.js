import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { listResources, getResource, createResource, updateResource, deleteResource } from '../controllers/resourceController.js';

export const resources = Router();
resources.get('/', requireAuth, listResources);
resources.get('/:id', requireAuth, getResource);
resources.post('/', requireAuth, requireRole('administrador'), createResource);
resources.put('/:id', requireAuth, requireRole('administrador'), updateResource);
resources.delete('/:id', requireAuth, requireRole('administrador'), deleteResource);
