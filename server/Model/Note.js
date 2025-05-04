import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    task: { type: String, required: true },
    taskId: { type: Number, required: true, unique: true }
});

TaskSchema.index({ title: 'text', task: 'text' });

const Task = mongoose.model('Task', TaskSchema);
export default Task;
