import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false },
  state: { type: Number, default: 1 }
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;