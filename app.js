import express from "express";
import cors from 'cors' 
//importamos la conexion a la base de datos
import "./database/db.js"
//importamos el enrutador
import blogRoutes from './routes/routes.js'
import userRoutes from './routes/userRoutes.js'; // rutas de usuarios
import authRoutes from './routes/authRoutes.js'; // rutas de autenticación
// import { requireUserRole } from './middleware/authMiddleware.js'; //  middleware de autenticación del ROL solamente
import rateLimit from 'express-rate-limit'; // Importando express-rate-limit

const app = express()

app.use(cors())
app.use(express.json())

// Configurar el middleware de express-rate-limit para evitar ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limitar a 5 solicitudes por ventana
    message: 'Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo más tarde.'
  });


// Aplicando el middleware de express-rate-limit a la ruta de inicio de sesión
app.use('/auth/login', limiter);

// Rutas de autenticación
app.use('/auth', authRoutes);

// Middleware de autenticación global
// app.use(requireUserRole);



app.use('/blogs', blogRoutes)
app.use('/uploads',express.static('uploads'));

app.use('/users', userRoutes);

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})

