import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  idusuario: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estado: { type: Number, default: 1 },
});

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

export default Usuario;