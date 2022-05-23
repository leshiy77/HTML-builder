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



const writeableStreamHTML = fs.createWriteStream(path.join(projectPath, 'index.html'));
const writeableStreamCSS = fs.createWriteStream(path.join(projectPath, 'style.css'));
const readableStreamHTML = fs.createReadStream(path.join(__dirname, 'template.html'));



async function mergeStyle (dir) {
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
          writeableStreamCSS.write(`${data}\n`);
        })
      }
    });
  } catch(err) {
    console.error(err);
  }
}

mergeStyle(stylePath);

fs.readdir(projectAssetsPath, (err, files) => {
  if (err) {
    return;
  } else {
    files.forEach(file => {
      fs.unlink(path.join(projectAssetsPath, file), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }  
});

async function copyDir (dir, copyDir) {
  fsPromises.mkdir(copyDir, { recursive: true });
  try {
    const files = await fsPromises.readdir(dir);
    files.forEach(file => {
      fsPromises.copyFile(path.join(dir, file), path.join(copyDir, file));
    });
  } catch (err) {
    console.error(err);
  }
}

copyDir(assetsPath, projectAssetsPath);