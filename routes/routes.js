import express from 'express'
import { requireAuth } from '../middleware/authMiddleware.js';
import {createReceta, getAllRecetas, getReceta, updateReceta, deleteReceta} from '../controllers/BlogController.js'
const router = express.Router()

//traer o mostrar todos los blogs
//ruta raiz '/' y el metodo:getAllBlogs

router.get('/', getAllRecetas)

//metodo para mostrar un solo Receta
router.get('/:id', getReceta)

//para crear
router.post('/',requireAuth,createReceta)

//para actualizar
router.put('/:id',requireAuth,updateReceta)

//para eliminar
router.delete('/:id',requireAuth,deleteReceta)


export default router