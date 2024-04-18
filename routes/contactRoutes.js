import express from 'express';
import { createContact } from '../controllers/ContactController.js';

const router = express.Router();

// Ruta para manejar la creación de un nuevo contacto
router.post('/contact', createContact);

export default router;