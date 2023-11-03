import { CronJob } from "cron";
import { backup } from "./backup";
import { env } from "./env";

const job = new CronJob(env.BACKUP_CRON_SCHEDULE, backup);

if (env.RUN_ON_STARTUP) backup();

job.start();

console.log(`Backup cron scheduled for: ${env.BACKUP_CRON_SCHEDULE}`);
