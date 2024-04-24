// loginRoutes.js

import express from 'express';
import { login, logout, register, profile } from '../controllers/LoginController.js';


// import { authRequired2 } from '../middleware/validateToken.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login',login ); // Ruta para iniciar sesión

router.post ('/logout',logout);

router.post('/register', register); // Ruta para registrar usuarios

router.get('/profile',  profile);

export default router;
