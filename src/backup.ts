import { deleteFile, dumpToFile, uploadToS3 } from "./helpers";

export async function backup() {
  try {
    console.log("Initiating DB backup...");

    let date = new Date().toISOString();
    const timestamp = date.replace(/[:.]+/g, "-");
    const filename = `${timestamp}.tar.gz`;
    const filepath = `/tmp/${filename}`;

    await dumpToFile(filepath);
    await uploadToS3(filename, filepath);
    await deleteFile(filepath);

    console.log("DB backup complete...");
  } catch (error) {
    console.error("Error while running backup: ", error);
  }
}
