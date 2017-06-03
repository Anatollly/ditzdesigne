const fs = require('fs');

const getNamesFromDir = (dir) => {
  let imagesData = {};
  fs.readdir(dir, (err, folders) => {
    if (err) {
      throw new Error('wrong directory');
    } else {
      folders.forEach((name, i) => {
        fs.readdir(dir + '/' + name, (err2, images) => {
          if (err2) {
            throw new Error('wrong file');
          } else {
            images.forEach((img, n) => {
              images[n] = dir + '/' + name + '/' + img;
            });
            imagesData[name] = images;
          }
        });
      });
    }
  });
  return imagesData;
};


module.exports = {
  getNamesFromDir
};
