import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  correo: string;
  contraseña_hash: string;
  preferencias?: {
    modo?: 'oscuro' | 'claro';
    idioma?: 'es' | 'en';
    orden_bloques?: 'fecha_creacion' | 'fecha_modificacion' | 'manual';
  };
}

const UserSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^.+@.+\..+$/,
  },
  contraseña_hash: {
    type: String,
    required: true,
  },
  preferencias: {
    modo: {
      type: String,
      enum: ['oscuro', 'claro'],
      default: 'claro',
    },
    idioma: {
      type: String,
      enum: ['es', 'en'],
      default: 'es',
    },
    orden_bloques: {
      type: String,
      enum: ['fecha_creacion', 'fecha_modificacion', 'manual'],
      default: 'fecha_creacion',
    },
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default mongoose.model<IUser>('User', UserSchema, 'usuarios');
