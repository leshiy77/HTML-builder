const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const stylePath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');

const writeableStream = fs.createWriteStream(path.join(projectPath, 'bundle.css'));

async function readDir (dir) {
  try {
    const files = await fsPromises.readdir(dir, {withFileTypes: true});
    const trueFiles = files.filter(elem => elem.isFile());
    trueFiles.forEach (file => {
      let fileObj = path.parse(path.join(dir, file.name));
      if (fileObj.ext === '.css') {
        fs.readFile(path.join(stylePath, fileObj.base), 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          }
          writeableStream.write(`${data}\n`);
        })
      }
    });
  } catch(err) {
    console.error(err);
  }
}

readDir(stylePath);



