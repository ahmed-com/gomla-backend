import { fromFile } from "file-type";
import { extname } from "path";

export async function verifyExtension(filePath: string) {
    const fileExt = extname(filePath);
    const realExt = (await fromFile(filePath)).ext;
    return fileExt === realExt;
}