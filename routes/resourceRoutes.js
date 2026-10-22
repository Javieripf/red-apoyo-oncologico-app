import { Router } from 'express';
import { requireRole } from '../middlewares/authMiddleware.js';
import { listResources, getResource, createResource, updateResource, deleteResource } from '../controllers/resourceController.js';

export const resources = Router();
resources.get('/', listResources);
resources.get('/:id', getResource);
resources.post('/', requireRole('administrador'), createResource);
resources.put('/:id', requireRole('administrador'), updateResource);
resources.delete('/:id', requireRole('administrador'), deleteResource);
