// routes/userRoutes.js

import express from 'express';
import {  requireAdmin, requireAuth } from '../middleware/authMiddleware.js';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/UsersController.js';

const router = express.Router();

// Rutas para gestionar usuarios
router.get('/users', requireAuth, requireAdmin, getAllUsers); 
router.post('/users', requireAdmin, createUser); // Solo el administrador puede crear usuarios
router.get('/users/:userId',requireAuth, getUserById); 
router.put('/users/:userId', requireAdmin, updateUser); // Solo el administrador puede actualizar un usuario por ID
router.delete('/users/:userId', requireAuth,requireAdmin, deleteUser); // Solo el administrador puede eliminar un usuario por ID

export default router;
