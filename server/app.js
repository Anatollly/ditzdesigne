const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const ALBUMSDIR = 'photo/albums';
const IMAGESDIR = 'photo/images';

// Сейчас app.js запускается с директории ditzdesigne, а в продакшене будет с build.
// сейчас app.js берет файлы в ditzdesigne/photo, а браузер - build/photo.
// в продакшене будет одна директория. ниче не поменяется, но нужно держать в уме

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

let allAlbumsData = getNamesFromDir(ALBUMSDIR);
let imagesOfPagesData = getNamesFromDir(IMAGESDIR);


app.get('/', function (req, res) {
  res.sendFile(path.resolve('build/index.html'));
});

app.get('/albums', function (req, res) {
  res.send(allAlbumsData);
});

app.get('/images', function (req, res) {
  res.send(imagesOfPagesData);
});

app.get('/test', function (req, res) {
  res.send('test');
});

app.use(express.static('build'));


app.listen(3501, function () {
  console.log('App listening on port 3501!');
});
