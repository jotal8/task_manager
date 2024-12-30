import jwt from 'jsonwebtoken';

import { NextRequest, NextResponse } from 'next/server';

export function authenticateToken(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'This route requires a token' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}