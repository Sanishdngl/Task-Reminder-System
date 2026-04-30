import Task from '../models/task.model';

export class TaskService {
  // Get all tasks
  static async findAll() {
    return await Task.findAll({
      order: [['due_date', 'ASC']],
    });
  }

  // Get single task by id
  static async findById(id: number) {
    return await Task.findByPk(id);
  }

  // Create a new task
  static async create(data: {
    title: string;
    description?: string;
    due_date: Date;
  }) {
    return await Task.create({
      ...data,
      is_completed: false,
      reminder_sent: false,
    });
  }

  // Update a task
  static async update(
    id: number,
    data: Partial<{
      title: string;
      description: string;
      due_date: Date;
      is_completed: boolean;
    }>,
  ) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(data);
  }

  // Delete a task
  static async delete(id: number) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.destroy();
    return true;
  }
}
