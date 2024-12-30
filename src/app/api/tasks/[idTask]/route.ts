import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '../../middleware';
import mongoose from 'mongoose';
import Task from './../../../../../models/Task';

/**
 * @swagger
 * /api/tasks/{idtask}:
 *    put:
 *       description: update fields of task, requires valid JWT token
 *       responses:
 *         200:
 *           description: Task saving successfully
 *         401:
 *           description: Invalid or missing token
 */
export async function PUT(req: NextRequest) {
  const authError = authenticateToken(req);
  if (authError) return authError;

  const id  = req.nextUrl.pathname.split("/").pop() as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Invalid or missing task ID', success: 0 },
      { status: 400 }
    );
  }

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const body = await req.json();
    const { field, value } = body;

    const task = await Task.findByIdAndUpdate(
      id,
      { [field]: value }
    );

    if (!task) {
      return NextResponse.json(
        { message: 'Task not found', success: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task updated successfully!', success: 1 },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete task', success: 0 },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/tasks/{idtask}:
 *    delete:
 *       description: delete Task, requires valid JWT token
 *       responses:
 *         200:
 *           description: Task saving successfully
 *         401:
 *           description: Invalid or missing token
 */
export async function DELETE(req: NextRequest) {
  const authError = authenticateToken(req);
  if (authError) return authError;

  const id = req.nextUrl.pathname.split("/").pop() as string;

  if (!id) {
    return NextResponse.json(
      { message: 'Invalid or missing task ID', success: 0 },
      { status: 400 }
    );
  }

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        { message: 'Task not found', success: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task deleted successfully!', success: 1 },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to delete task', success: 0 },
      { status: 500 }
    );
  }
}