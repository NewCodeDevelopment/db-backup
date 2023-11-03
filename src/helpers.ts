import { exec } from "child_process";
import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { createReadStream, unlink } from "fs";
import { env } from "./env";

export async function uploadToS3(name: string, path: string) {
  console.log("Uploading backup to S3...");

  const bucket = env.AWS_S3_BUCKET;

  const clientOptions: S3ClientConfig = {
    region: env.AWS_S3_REGION,
  };

  const client = new S3Client(clientOptions);

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `backups/${name}`,
    Body: createReadStream(path),
  });

  await client.send(command);

  console.log("Backup uploaded to S3...");
}

export async function dumpToFile(path: string) {
  console.log("Dumping DB to file...");

  await new Promise((resolve, reject) => {
    exec(`pg_dump ${env.BACKUP_DATABASE_URL} -F t | gzip > ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error: JSON.stringify(error), stderr });
        return;
      }

      resolve(undefined);
    });
  });

  console.log("DB dumped to file...");
}

export async function deleteFile(path: string) {
  console.log("Deleting file...");

  await new Promise((resolve, reject) => {
    unlink(path, (err) => {
      reject({ error: JSON.stringify(err) });
      return;
    });
    resolve(undefined);
  });
}
