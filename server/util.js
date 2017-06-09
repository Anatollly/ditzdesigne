const fs = require('fs');

const getPathsOfFiles = (dir) => {
  let dirData = {};
  if (fs.existsSync(dir)) {
    let folders = fs.readdirSync(dir);
    folders.forEach((folderName) => {
      let files = fs.readdirSync(dir + '/' + folderName);
      if (files.length === 0) {
        dirData[folderName] = [];
      } else {
        files.forEach((filesName, i) => {
          files[i] = dir + '/' + folderName + '/' + filesName;
        });
        dirData[folderName] = files;
      }
    });
  } else {
    throw new Error(`Directory "${dir}" not found`);
  }
  return dirData;
};


const delFiles = (files) => {
  files.forEach((fileName) => {
    fs.unlinkSync(fileName);
  });
};

module.exports = {
  getPathsOfFiles,
  delFiles
};
