import express from 'express'
import {createReceta, getAllRecetas, getReceta, updateReceta, deleteReceta} from '../controllers/BlogController.js'
const router = express.Router()

//traer o mostrar todos los blogs
//ruta raiz '/' y el metodo:getAllBlogs

router.get('/', getAllRecetas)

//metodo para mostrar un solo Receta
router.get('/:id', getReceta)

//para crear
router.post('/',createReceta)

//para actualizar
router.put('/:id',updateReceta)

//para eliminar
router.delete('/:id',deleteReceta)


export default router