const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile, 'utf-8');

stream.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error('no such file in directory');
  } else {
    throw err;
  }
});

stream.on('data', (chunk) => {
  console.log(chunk);
});