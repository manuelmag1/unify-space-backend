import mongoose, { Schema, Document } from 'mongoose';

export interface IBlock extends Document {
  pagina_id: mongoose.Types.ObjectId;
  tipo: 'texto' | 'imagen' | 'video' | 'pdf' | 'enlace';
  contenido: string;
  metadatos: {
    etiquetas?: string[];
    tipo_archivo: 'texto' | 'imagen' | 'video' | 'pdf' | 'enlace';
    descripcion?: string;
  };
  position?: number;
}

const BlockSchema: Schema = new Schema({
  pagina_id: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['texto', 'imagen', 'video', 'pdf', 'enlace'],
  },
  contenido: {
    type: String,
    required: true,
    default: '',
  },
  metadatos: {
    type: {
      etiquetas: {
        type: [String],
        default: [],
      },
      tipo_archivo: {
        type: String,
        required: true,
        enum: ['texto', 'imagen', 'video', 'pdf', 'enlace'],
      },
      descripcion: {
        type: String,
        default: '',
      },
    },
    required: true,
  },
  position: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default mongoose.model<IBlock>('Block', BlockSchema, 'bloques');
