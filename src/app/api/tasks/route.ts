import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '../middleware';
import mongoose from 'mongoose';
import Task from './../../../../models/Task';

/**
 * @swagger
 * /api/tasks:
 *    get:
 *       description: Get all tasks, requires valid JWT token
 *       responses:
 *         200:
 *           description: Tasks fetched successfully
 *         401:
 *           description: Invalid or missing token
 */
export async function GET(req: NextRequest) {
  const authError = authenticateToken(req);
  if (authError) return authError;
  const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ];

  return NextResponse.json({ tasks });
}

/**
 * @swagger
 * /api/tasks:
 *    post:
 *       description: Save new Task, requires valid JWT token
 *       responses:
 *         200:
 *           description: Task saving successfully
 *         401:
 *           description: Invalid or missing token
 */
export async function POST(req: NextRequest) {
  const authError = authenticateToken(req);
  if (authError) return authError;
  
  try {
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: 'Title is required', success: 0 },
        { status: 400 }
      );
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const task = new Task({
      title,
      description,
    });

    await task.save();

    return NextResponse.json(
      { message: 'Task created successfully!', success: 1},
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving task:', error);
    return NextResponse.json(
      { message: 'Failed to save task', success: 0 },
      { status: 500 }
    );
  }
}