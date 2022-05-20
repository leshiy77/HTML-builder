const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const pathToDir = path.join(__dirname, 'files');
const pathToCopyDir = path.join(__dirname, 'files-copy');

async function copyDir (dir, copyDir) {
  fsPromises.mkdir(copyDir, { recursive: true });
  try {
    const files = await fsPromises.readdir(dir);
    files.forEach(file => {
      fsPromises.copyFile(path.join(dir, file), path.join(copyDir, file));
    })
  } catch (err) {
    console.error(err);
  }
}

copyDir(pathToDir, pathToCopyDir);