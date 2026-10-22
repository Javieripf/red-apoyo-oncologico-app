import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { register, login, me, updateMe } from '../controllers/authController.js';

export const auth = Router();
auth.post('/register', register);
auth.post('/login', login);
auth.get('/me', requireAuth, me);
auth.patch('/me', requireAuth, updateMe);
