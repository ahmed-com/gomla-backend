import { unlink } from 'fs';

export async function removeFiles(files: Array<Express.Multer.File>) {
  files.forEach((file) => unlink(file.path, () => {}));
}
