// // middleware/checkAdmin.js

// export const checkAdmin = (req, res, next) => {
//     // Verificar si el usuario tiene el rol de administrador
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ error: 'Acceso no autorizado' });
//     }
//     // Si el usuario es administrador, continuar con la siguiente función
//     next();
//   };
  