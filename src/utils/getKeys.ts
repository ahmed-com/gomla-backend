import { resolve } from 'path';
import { readFileSync } from 'fs';

const publicKeyPath = resolve(process.cwd(), 'id_rsa_pub.pem');
const privateKeyPath = resolve(process.cwd(), 'id_rsa_priv.pem');

const publicKey = readFileSync(publicKeyPath, 'utf-8');
const privateKey = readFileSync(privateKeyPath, 'utf-8');

export default function getKeys(): { publicKey: string; privateKey: string } {
  return { publicKey, privateKey };
}
