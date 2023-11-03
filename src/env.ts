import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    AWS_ACCESS_KEY_ID: z.string({
      invalid_type_error: "Invalid AWS access key",
      required_error: "AWS access key is required",
    }),
    AWS_SECRET_ACCESS_KEY: z.string({
      invalid_type_error: "Invalid AWS secret access key",
      required_error: "AWS secret access key is required",
    }),
    AWS_S3_BUCKET: z.string({
      invalid_type_error: "Invalid AWS bucket",
      required_error: "AWS bucket is required",
    }),
    AWS_S3_REGION: z.string({
      invalid_type_error: "Invalid AWS region",
      required_error: "AWS region is required",
    }),
    BACKUP_DATABASE_URL: z.string({
      invalid_type_error: "Invalid database URL",
      required_error: "Database URL is required",
    }),
    BACKUP_CRON_SCHEDULE: z
      .string({
        invalid_type_error: "Invalid cron schedule",
        required_error: "Cron schedule is required",
      })
      .optional()
      .default("0 5 * * *"),
    RUN_ON_STARTUP: z.coerce.boolean().optional().default(false),
  })
  .parse(process.env);
