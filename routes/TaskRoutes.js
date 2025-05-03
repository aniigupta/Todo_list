import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask, searchTasks } from '../controller/Taskcontroller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);

// Routes
router.post('/create-task', createTask);
router.get('/getallTasks', getAllTasks);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.get('/search', searchTasks);

export default router;
