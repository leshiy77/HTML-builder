const path = require('path');
const fs = require('fs');

const pathToDir = path.join(__dirname, 'files');
const pathToCopyDir = path.join(__dirname, 'files-copy');

const copyDir = (dir, newDir) => {
  fs.rm(newDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.mkdir(newDir, { recursive:true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      }
      files.forEach(file => {
        let filePath = path.join(dir, file.name);
        let fileNewPath = path.join(newDir, file.name);
        if (file.isFile()) {
          fs.copyFile(filePath, fileNewPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        if (file.isDirectory()) {
          copyDir(filePath, fileNewPath);
        }
      });
    });
  });
};


copyDir(pathToDir, pathToCopyDir);