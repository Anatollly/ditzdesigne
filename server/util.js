const fs = require('fs');
const mkdirp = require('mkdirp');
const Jimp = require('jimp');

const getPathsOfFiles = (dir) => {
  let dirData = {};
  if (fs.existsSync('build/' + dir)) {
    let folders = fs.readdirSync('build/' + dir);
    folders.forEach((folderName) => {
      let files = fs.readdirSync('build/' + dir + '/' + folderName);
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

const createFolder = (dir, cb) => {
  if (!fs.existsSync(dir)) {
    mkdirp(dir, (err) => {
      if (err) {
        console.log(err);
      } else {
        cb();
      }
    });
  }
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

const resizeImage = (source, target, cb) => {

  if (!fs.existsSync(target)) {
    Jimp.read(source)
        .then((img) => {
          img.cover(256, 256) // resize
              .quality(60) // set JPEG quality
              .write(target); // save
        })
        .then(() => {
          cb();
        })
        .catch((err) => {
          console.error(err);
        });
  }
};

const checkDir = (sourceDir, targetDir, cb) => {
  fs.readdir(sourceDir, (err, folders) => {
    if (err) {
      console.log(err);
    } else {
      let n = 0;
      folders.forEach((folder) => {
        createFolder(targetDir + '/' + folder, () => {
          n++;
          fs.readdir(sourceDir + '/' + folder, (err2, images) => {
            images.forEach((image) => {
              resizeImage(sourceDir + '/' + folder + '/' + image, targetDir + '/' + folder + '/' + image, () => {
              });
            });
          });
          if (folders.length === n) {
            cb();
          }
        });
      });
    }
  });
};


const delFiles = (files, cb) => {
  let n = 0;
  files.forEach((file) => {
    fs.unlink('build/' + file, () => {
      n++;
      if (files.length === n) {
        cb();
      }
    });
  });
};

const delFilesMin = (files, cb) => {
  let n = 0;
  files.forEach((file) => {
    let fileMin = 'build/' + file.substr(0, 11) + '_min' + file.substr(12);
    fs.unlink(fileMin, () => {
      n++;
      if (files.length === n) {
        cb();
      }
    });
  });
};

module.exports = {
  getPathsOfFiles,
  delFiles,
  delFilesMin,
  copyFile,
  createFolder,
  resizeImage,
  checkDir
};
