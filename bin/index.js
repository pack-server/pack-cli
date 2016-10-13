const path = require('path');
const curPath = process.cwd();
const tar = require('../src/tar.js');
const io = require('socket.io-client');

require('shelljs/global');

let programPath = path.resolve(curPath, '../');
let dirName = path.basename(curPath);
// let socket = io('http://localhost:3000');
tar(curPath);
// cd('.targz');

// socket.on()



