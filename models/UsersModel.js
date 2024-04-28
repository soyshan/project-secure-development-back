import mongoose from 'mongoose';

import { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String }, 
    lastName: { type: String }, 
    username: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const UsersModel = mongoose.model('usuarios', userSchema);

  export default UsersModel;