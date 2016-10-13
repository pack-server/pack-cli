const fs = require('fs');
const targz = require('tar.gz');
const path = require('path');
const upload = require('./upload.js');

function tar(curPath) {
  console.info('压缩中.....');
  let read = targz().createReadStream(curPath);
  upload(read);
  // mkdir(path.resolve(curPath,'../.targz'));
  // let write = fs.createWriteStream(path.resolve(curPath,'../.targz','compressed.tar.gz'));
  // read.pipe(write);
}
module.exports = tar;