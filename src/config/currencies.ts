import {readFileSync} from 'fs';
import path from 'path';

export default JSON.parse(readFileSync(`${process.cwd()}/src/config/currencies.json`, 'utf8'));