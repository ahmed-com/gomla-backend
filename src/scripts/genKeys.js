const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const publicKeyPath = path.join(
  __dirname,
  '..',
  path.sep,
  '..',
  path.sep,
  'id_rsa_pub.pem',
);

const privateKeyPath = path.join(
  __dirname,
  '..',
  path.sep,
  '..',
  path.sep,
  'id_rsa_priv.pem',
);

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync(publicKeyPath, keyPair.publicKey);

  fs.writeFileSync(privateKeyPath, keyPair.privateKey);
}

genKeyPair();