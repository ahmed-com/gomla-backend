import {resolve} from 'path';
import {readFileSync} from 'fs';

const publicKeyPath = resolve(process.cwd(), 'id_rsa_pub.pem')
const privateKeyPath = resolve(process.cwd(), 'id_rsa_priv.pem')

export const publicKey = readFileSync(publicKeyPath,'utf-8');
export const privateKey = readFileSync(privateKeyPath,'utf-8');