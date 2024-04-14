import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su correo electrónico
        const user = await UsersModel.findOne({ email });

        // Si no se encuentra el usuario, devolver un error
        if (!user) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.firstName,
                role: user.role,
                expiresIn: '1h' // Establecer la fecha de expiración del token (por ejemplo, 1 hora)
            },
            process.env.JWT_SECRET // Utilizar una clave secreta para firmar el token
        );

        // Enviar el token JWT en la respuesta
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};
