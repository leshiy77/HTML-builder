const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const Emitter = require('events');

const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const emitter = new Emitter();

stdout.write('Hello, write your data or "exit" for cancel\n');
process.on('SIGINT', () => process.exit());

stdin.on('data', data => {
  emitter.on('exit', (text) =>{
    if (text === 'exit') {
      process.exit();
    }
  });  
  emitter.emit('exit', data.toString());
  writeableStream.write(data.toString());
});

process.on('exit', () => {
  stdout.write('Thanks for your data!');
});
