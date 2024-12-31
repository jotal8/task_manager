import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Usuario from './../models/Usuario.js';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {

try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Conectado a la base de datos:', db.connection.name);
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1);
  }
};

const createDefaultUser = async () => {
  await connectToDatabase();
  try {
    const existingUser = await Usuario.findOne({ email: 'admin@coally.com' });
    if (existingUser) {
      console.log('El usuario por defecto ya existe.');
      return;
    }

    const hashedPassword = await bcrypt.hash('holamundo', 10);

    const defaultUser = new Usuario({
      idusuario: 1,
      nombre: 'Administrador',
      email: 'admin@coally.com',
      password: hashedPassword,
      estado: 1,
    });

    await defaultUser.save();
    console.log('User created successfully!');
  } catch (error) {
    console.error('Error in creation default user', error);
  } finally {
    mongoose.connection.close();
    
  }
};

createDefaultUser();