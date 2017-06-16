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

const copyFile = (source, target, cb) => {
  let cbCalled = false;

  const done = (err) => {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };

  let rd = fs.createReadStream(source);
  rd.on('error', (err) => {
    done(err);
  });
  let wr = fs.createWriteStream(target);
  wr.on('error', (err) => {
    done(err);
  });
  wr.on('close', (ex) => {
    done();
  });
  rd.pipe(wr);
};

const createFolder = (dir) => {
  console.log(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

module.exports = {
  getPathsOfFiles,
  delFiles,
  copyFile,
  createFolder
};
