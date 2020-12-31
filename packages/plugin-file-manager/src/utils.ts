import crypto from 'crypto';
import path from 'path';

export function getFilename (req, file, cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : `${raw.toString('hex')}${path.extname(file.originalname)}`)
  })
}
