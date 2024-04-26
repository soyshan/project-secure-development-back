import ContactModel from '../models/ContactModel.js';


export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Crear una nueva instancia del modelo de contacto
    const newContact = new ContactModel({ name, email, message });

    // Guardar el nuevo contacto en la base de datos
    await newContact.save();

    res.status(201).json({ message: 'Formulario de contacto guardado exitosamente' });
  } catch (error) {
  
    console.error('Error al crear el contacto:', error);
    res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};
