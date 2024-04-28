import mongoose from 'mongoose';
const { Schema } = mongoose;

// Definir el esquema de la colección de recetas
const recetaSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  ingredient: { type: String, required: true },
  image_url: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al autor de la receta
  categories: [{ type: String }] // Campo para las categorías de la receta (array de strings)
});

// Definir el modelo de la colección de recetas
const RecetaModel = mongoose.model('receta', recetaSchema);


export default RecetaModel;
