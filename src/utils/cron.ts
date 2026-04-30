import cron from 'node-cron';
import { sendReminders } from './reminder';

export const initCronJobs = () => {
  // Runs every minute — good for testing
  // Change to '0 9 * * *' for daily at 9AM in production
  cron.schedule('* * * * *', async () => {
    console.log('🕐 Running reminder check...');
    await sendReminders();
  });

  console.log('✅ Cron jobs initialized');
};
