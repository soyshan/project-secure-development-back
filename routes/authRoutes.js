// loginRoutes.js

import express from 'express';
import { login, register } from '../controllers/LoginController.js';
// import { limitLogin } from '../middleware/limiter.js';
const router = express.Router();

// Rutas de autenticación
router.post('/login', login ); // Ruta para iniciar sesión
router.post('/register', register); // Ruta para registrar usuarios

export default router;
