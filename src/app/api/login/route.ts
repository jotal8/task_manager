import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Usuario from '../../../../models/Usuario';
import bcrypt from 'bcrypt';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

/**
 * @swagger
 * /api/login:
 *    post:
 *       description: Login service, return authorization token
 *       responses:
 *         200:
 *           description: Login successful
 *         401:
 *            description: Invalid credentials
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    const user = await Usuario.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      return NextResponse.json({ message: 'Login successful!', token, success: 1, id: user.idusuario });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}