// routes/userRoutes.js

import express from 'express';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/UsersController.js';

const router = express.Router();

// Rutas para gestionar usuarios
router.get('/users',  getAllUsers); 
router.post('/users', checkAdmin, createUser); // Solo el administrador puede crear usuarios
router.get('/users/:id', getUserById); 
router.put('/users/:id', checkAdmin, updateUser); // Solo el administrador puede actualizar un usuario por ID
router.delete('/users/:id', checkAdmin, deleteUser); // Solo el administrador puede eliminar un usuario por ID

export default router;
