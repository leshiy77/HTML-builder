const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello, write your data or "exit" for cancel\n');
process.on('SIGINT', () => process.exit());

stdin.on('data', data => {
 if (data.toString().trim() === 'exit' || data.toString().trim() === 'Exit' ) {
   process.exit();
 } else {
  writeableStream.write(`${data.toString().trim()}\n`);
 }
});

process.on('exit', () => {
  stdout.write('Thanks for your data!');
});