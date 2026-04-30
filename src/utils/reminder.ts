import Task from '../models/task.model';
import { Op } from 'sequelize';

export const sendReminders = async () => {
  try {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find tasks due within next 24 hours, not completed, reminder not sent yet
    const tasksDue = await Task.findAll({
      where: {
        due_date: {
          [Op.between]: [now, next24Hours],
        },
        is_completed: false,
        reminder_sent: false,
      },
    });

    if (tasksDue.length === 0) {
      console.log('⏰ No pending reminders at', now.toISOString());
      return;
    }

    for (const task of tasksDue) {
      // 👇 In real app: send email/SMS here
      console.log(
        `🔔 REMINDER: Task "${task.title}" is due at ${task.due_date}`,
      );

      // Mark reminder as sent so we don't remind again
      await task.update({ reminder_sent: true });
    }

    console.log(`✅ Sent ${tasksDue.length} reminder(s)`);
  } catch (error) {
    console.error('❌ Reminder cron failed:', error);
  }
};
