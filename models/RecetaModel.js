import mongoose from 'mongoose';
const { Schema } = mongoose;

// Definir el esquema de la colección de recetas
const recetaSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  ingredient: { type: String, required: true },
  image_url: { type: String }
});

// Definir el modelo de la colección de recetas
const RecetaModel = mongoose.model('receta', recetaSchema);

export default RecetaModel;
