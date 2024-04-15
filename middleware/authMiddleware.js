// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

// Middleware para validar el rol del usuario
export const requireUserRole = (req, res, next) => {
  // Obtener el token JWT del encabezado de autorización que obtiene del fronted que se guardará en localStorage
  const token = req.headers.authorization;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }

  try {
    // Decodificar el token JWT para obtener la información del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el usuario tiene el rol de usuario
    if (decodedToken.role !== 'user') {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }

    // Si el usuario tiene el rol de usuario, continuar con la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autorización inválido' });
  }
};
