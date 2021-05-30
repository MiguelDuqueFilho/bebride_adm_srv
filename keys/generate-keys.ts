import fs from 'fs';
import { generateKeyPair } from 'crypto';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const password = process.env.APP_SECRET;

path.resolve(__dirname, 'public.pem');

generateKeyPair(
  'rsa',
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: password,
    },
  },
  (erro, chavePublica, chavePrivada) => {
    try {
      fs.writeFileSync(path.resolve(__dirname, 'public.pem'), chavePublica);
      fs.writeFileSync(path.resolve(__dirname, 'private.key'), chavePrivada);
      console.log('private and public key generate and written successfully');
    } catch (err) {
      console.error(err);
    }
  }
);
