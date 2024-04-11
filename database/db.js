import mongoose from 'mongoose';

// URL de conexión a MongoDB Atlas
const db_mongo = 'mongodb+srv://Shanshan:dSlCreAzpF61riua@cluster0.i11gtdy.mongodb.net/recetas_database?retryWrites=true&w=majority';


// Conexión a la base de datos MongoDB Atlas
mongoose.connect(db_mongo)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB Atlas:', error);
  });
