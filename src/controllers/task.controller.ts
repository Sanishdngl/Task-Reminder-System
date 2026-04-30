import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

// GET /api/tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.findAll();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.findById(Number(req.params.id));
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch task' });
  }
};

// POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || !due_date) {
      return res
        .status(400)
        .json({ success: false, message: 'title and due_date are required' });
    }

    const task = await TaskService.create({ title, description, due_date });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create task' });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.update(Number(req.params.id), req.body);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update task' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await TaskService.delete(Number(req.params.id));
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
};
