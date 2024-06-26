import bcrypt from 'bcrypt';
import UsersModel from '../models/UsersModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await UsersModel.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Aplicar hash a la contraseña
        const newUser = await UsersModel.create({ firstName, lastName, username, email, password: hashedPassword }); // Guardar la contraseña hasheada
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear usuario' });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UsersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { firstName, lastName, username, email } = req.body;
    try {
        const user = await UsersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await UsersModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(204).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};