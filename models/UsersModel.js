import mongoose from 'mongoose';

import { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  });
  
  const UsersModel = mongoose.model('User', userSchema);

  export default UsersModel;