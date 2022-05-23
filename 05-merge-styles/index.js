const path = require('path');
const fs = require('fs');

const stylePath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');

const writeableStream = fs.createWriteStream(path.join(projectPath, 'bundle.css'));

fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach( file => {
    if (file.isFile()) {
      let filePath = path.join(stylePath, file.name);
      let fileObj = path.parse(filePath);
      if (fileObj.ext === '.css') {
        let readStream = fs.createReadStream(filePath, 'utf-8');
        let style = ' ';
        readStream.on('data', (chunk) => {
          style += chunk;
        });
        readStream.on('end', () => {
          writeableStream.write(style.trim());
          writeableStream.write('\n');
        });
        readStream.on('error', (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
});

