import {rateLimit} from 'express-rate-limit';

export const tokenExpiration = 3 *  60 * 60 * 1000; // 3 días en milisegundos

export const limitLogin = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutos
    max: 3, // Limitar a 2 solicitudes por ventana
    message: 'Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo más tarde.'
  });
