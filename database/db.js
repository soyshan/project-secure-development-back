import mongoose from 'mongoose';
// URL de conexión a MongoDB Atlas
const db_mongo = process.env.DB_MONGO;

// Conexión a la base de datos MongoDB Atlas
mongoose.connect(db_mongo)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB Atlas:', error);
  });
