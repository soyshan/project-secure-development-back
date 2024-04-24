// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware para verificar si el usuario ha iniciado sesión
export const requireAuth = (req, res, next) => {
  // Obtener el token JWT de la cookie
  const token = req.cookies.token;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado: Debes iniciar sesión' });
  }

  try {
    // Decodificar el token JWT para obtener la información del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el objeto de usuario decodificado a la solicitud para que esté disponible en otros middlewares y controladores
    req.user = decodedToken;
    
    // Si el usuario está autenticado, continuar con la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autorización inválido' });
  }
};

// Middleware para verificar si el usuario es administrador
export const requireAdmin = (req, res, next) => {
  // Verificar si el usuario es administrador
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso no autorizado: Debes ser administrador' });
  }
  // Si el usuario es administrador, continuar con la siguiente función
  next();
};
