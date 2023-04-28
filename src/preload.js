const {contextBridge} = require('electron');
const path = require('path');
const fs = require('fs');

const getFilePath = (fileName) => path.join(__dirname, 'files', fileName);

contextBridge.exposeInMainWorld('electron', {
  getFileNames: () => {
    let files = fs.readdirSync(path.join(__dirname, 'files'))
    .map(fileName => fileName);
    return files.join('\n');
  },
  readFile: (fileName) => {
    let fileText = fs.readFileSync(getFilePath(fileName), 'utf8');
    return fileText;
  },
  createFile: (fileName) => {
    let fileTitle = getFilePath(fileName);
    fs.writeFileSync(`${fileTitle}.txt`, '');
  },
  writeFile: (fileName, fileText) => fs.writeFileSync(getFilePath(fileName), fileText),
  deleteFile: (fileName) => fs.unlinkSync(getFilePath(fileName))
});