import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  nombre: string;
  codigo?: string;
  usuario_id: mongoose.Types.ObjectId;
  icon?: string;
  color?: string;
  position?: number;
}

const SubjectSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    unique: true,
    sparse: true,
  },
  usuario_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  position: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default mongoose.model<ISubject>('Subject', SubjectSchema, 'materias');
