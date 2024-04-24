import express from "express";
import cors from 'cors' 
import dotenv from 'dotenv';
//importamos la conexion a la base de datos
import "./database/db.js"
//importamos el enrutador
import blogRoutes from './routes/routes.js'
import userRoutes from './routes/userRoutes.js'; // rutas de usuarios
import authRoutes from './routes/authRoutes.js'; // rutas de autenticación
// import { requireAuth } from './middleware/authMiddleware.js'; //  middleware de autenticación 
import contactRoutes from './routes/contactRoutes.js';

import cookieParser from "cookie-parser";

dotenv.config();
const app = express()
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'https://project-secure-development-back.onrender.com', 'https://project-secure-development-front.onrender.com'], // Permitir solicitudes desde el puerto 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir todos los métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir ciertos encabezados
    credentials: true, // Habilitar el soporte de credenciales CORS si es necesario
  }));
  
app.use(express.json())


// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de contacto
app.use('/', contactRoutes); // Utiliza las rutas de contacto

// Middleware de autenticación global
// app.use(requireAuth);

app.use('/blogs', blogRoutes)
app.use('/uploads',express.static('uploads'));

app.use('/users', userRoutes);

const port = process.env.PORT ;

app.listen(port, () => {
    console.log(`Server UP running in http://localhost:${port}/`);
});


