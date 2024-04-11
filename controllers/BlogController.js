import RecetaModel from "../models/RecetaModel.js";
import { uploadImage } from '../middleware/Upload.js';
import multer from "multer";

//* Métodos para el CRUD **/

// Mostrar todos los registros
export const getAllRecetas = async (req, res) => {
    try {
        const recetas = await RecetaModel.find({});
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mostrar un registro por ID
export const getReceta = async (req, res) => {
    try {
        const receta = await RecetaModel.findById(req.params.id);
        if (!receta) {
            return res.status(404).json({ message: "La receta no existe" });
        }
        res.json(receta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un registro
export const createReceta = async (req, res) => {
    try {
        // Ejecuta el middleware de multer para manejar la carga de la imagen
        uploadImage(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            try {
                const image_url = req.file ? req.file.path.replace(/\\/g, '/') : null;
                const newReceta = await RecetaModel.create({
                    title: req.body.title,
                    content: req.body.content,
                    ingredient: req.body.ingredient,
                    image_url: image_url
                });

                res.json({
                    message: "¡Registro creado correctamente!",
                    receta: newReceta
                });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Actualizar un registro
export const updateReceta = async (req, res) => {
    try {
        // Ejecuta el middleware de multer para manejar la carga de la imagen
        uploadImage(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (req.file) {
                req.body.image_url = req.file.path; 
            }

            // Actualiza la receta
            await RecetaModel.findByIdAndUpdate(req.params.id, req.body);

            res.json({
                "message": "Registro actualizado correctamente"
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Eliminar un registro
export const deleteReceta = async (req, res) => {
    try {
        await RecetaModel.findByIdAndDelete(req.params.id);
        res.json({
            "message": "Registro eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
