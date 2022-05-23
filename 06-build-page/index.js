const path = require('path');
const fs = require('fs');

const projectPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const stylePath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const projectAssetsPath = path.join(projectPath, 'assets');

fs.mkdir(path.join(projectPath), { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});

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


copyDir(assetsPath, projectAssetsPath);

