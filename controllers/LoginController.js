import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';
import dotenv from 'dotenv';
dotenv.config();

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
                expiresIn: '1h' // fecha de expiración del token 
            },
            process.env.JWT_SECRET // Utilizar una clave secreta para firmar el token
        );

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60) // Expira en 1 hora
        });


        // Enviar el token JWT en la respuesta
        return res.status(200).json({ token,
            userId: user._id,
            email: user.email,
            name: user.firstName,
            role: user.role
        });


    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const logout = (req, res) =>{
res.cookie('token', '', {
    expires:new Date(0)
})
return res.sendStatus(200)
}


export const register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    
    try {
        const existingEmail = await UsersModel.findOne({ email });

        if(existingEmail){
            return res.status(400).json({ message: "El correo electrónico ya está en uso" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UsersModel({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashPassword,
            role: 'user' // Establecer el rol predeterminado como 'user'
        });

        await newUser.save();

        res.status(200).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal en el servidor", error });
    }
};


export const profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Construye el objeto con la información del usuario
        const userInfo = {
            userId: user._id,
            email: user.email,
            name: user.firstName,
            role: user.role,
            expiresIn: '1h' // Establecer la fecha de expiración del token (por ejemplo, 1 hora)
        };

        // Envía la respuesta con toda la información del usuario
        return res.json(userInfo);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};
