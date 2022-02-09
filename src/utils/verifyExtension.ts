import { fromFile } from "file-type";
import { allowedImageExtensions } from "src/config/imageExtensions";

export async function verifyExtension(filePath: string) {
    const realExt = (await fromFile(filePath)).ext;
    return allowedImageExtensions.includes(realExt);
}