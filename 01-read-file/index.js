const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile, 'utf-8');
const data = [];

stream.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error('no such file in directory');
  } else {
    console.error(err);
  }
});

stream.on('data', (chunk) => {
  data.push(chunk);
});

stream.on('end', () => {
  console.log(data.join(''));
});