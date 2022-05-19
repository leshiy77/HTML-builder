const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function readDir (pathForDir) {
  try {
    const files = await fsPromises.readdir(pathForDir, {withFileTypes: true});
    const trueFiles = files.filter(elem => elem.isFile());
    trueFiles.forEach (file => {
      let fileObj = path.parse(path.join(pathForDir, file.name));
      fs.stat(path.join(pathForDir, file.name), (err, stats) => {
        if(err) {
          console.error(err);
        }
        console.log(`${fileObj.name}-${fileObj.ext}-${stats.size}`);
      });
    });
  } catch(err) {
    console.error(err);
  }
}

readDir(path.join(__dirname, 'secret-folder'));

