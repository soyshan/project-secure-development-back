import mongoose from 'mongoose';

import { Schema } from "mongoose";

const contactSchema = new Schema({
    name: { type: String }, 
    email: { type: String }, 
    message: { type: String }

});

  const ContactModel = mongoose.model('contacto', contactSchema);

  export default ContactModel;