const path = require('path');
const fs = require('fs');

const projectPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const stylePath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const projectAssetsPath = path.join(projectPath, 'assets');
const indexPath = path.join(projectPath, 'index.html');
const templatePath = path.join(__dirname, 'template.html');

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

const styleWriteableStream = fs.createWriteStream(path.join(projectPath, 'style.css'));
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
          styleWriteableStream.write(style.trim());
          styleWriteableStream.write('\n');
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

fs.readFile(templatePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  let templateHTML = data;
  let tags = data.match(/{{\w+}}/gm);
  for (let tag of tags) {
    let tagPath = path.join(componentsPath, `${tag.slice(2, -2)}.html`);
    fs.readFile(tagPath, 'utf-8', (err, tagData) => {
      if (err) {
        console.log(err);
      }
      templateHTML = templateHTML.replace(tag, tagData);
      fs.rm(indexPath, { recursive: true, force: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        const indexWriteableStream = fs.createWriteStream(indexPath);
        indexWriteableStream.write(templateHTML);
      });
    });
  }
});