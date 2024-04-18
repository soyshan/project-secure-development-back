import ContactModel from '../models/ContactModel.js';

// Controlador para manejar la creación de un nuevo contacto
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Crear una nueva instancia del modelo de contacto
    const newContact = new ContactModel({ name, email, message });

    // Guardar el nuevo contacto en la base de datos
    await newContact.save();

    // Respuesta exitosa
    res.status(201).json({ message: 'Formulario de contacto guardado exitosamente' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el contacto:', error);
    res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};

// Otros controladores relacionados con el modelo de contacto pueden ser implementados aquí, como obtener todos los contactos, obtener un contacto por ID, actualizar un contacto, eliminar un contacto, etc.
