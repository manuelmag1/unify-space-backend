import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  materia_id: mongoose.Types.ObjectId;
  titulo: string;
  fecha_creacion: Date;
  icon?: string;
  tags?: string[];
  position?: number;
}

const PageSchema: Schema = new Schema({
  materia_id: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  titulo: {
    type: String,
    required: true,
    default: 'Sin título',
  },
  fecha_creacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  icon: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  position: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default mongoose.model<IPage>('Page', PageSchema, 'paginas');
