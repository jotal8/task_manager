import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '../middleware';
import mongoose from 'mongoose';
import Task from './../../../../models/Task';

export async function GET(req: NextRequest) {
  const authError = authenticateToken(req);
  if (authError) return authError;

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const tasks = await Task.find({
      state: 1
    }).lean();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { message: 'Failed to fetch tasks', success: 0 },
      { status: 500 }
    );
  }
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
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const task = new Task({
      title,
      description,
    });

    await task.save();

    return NextResponse.json(
      { message: 'Task created successfully!', success: 1, task},
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