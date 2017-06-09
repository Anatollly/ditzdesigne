const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
// const fs = require('fs');
const rimraf = require('rimraf');
// const rmdir = require('rmdir');
// const {currentAlbumsData, currentImagesData} = require('./data');
const {getPathsOfFiles, delFiles} = require('./util');
// const scanFolder = require('scan-folder');
// const data = require('./data');

const app = express();

let pathRoot = '';

if (app.get('env') === 'development') {
  pathRoot = 'build/';
}

console.log(pathRoot);
console.log(process.env.NODE_ENV);
console.log(__dirname);
console.log(path.resolve());

app.disable('x-powered-by');
app.set('views', path.resolve(pathRoot + 'server/views'));
app.set('view engine', 'pug');

// Сейчас app.js запускается с директории ditzdesigne, а в продакшене будет с build.
// сейчас app.js берет файлы в ditzdesigne/photo, а браузер - build/photo.
// в продакшене будет одна директория. ниче не поменяется, но нужно держать в уме

app.use(express.static(path.resolve(pathRoot)));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(pathRoot + 'index.html'));
});

const ALBUMSDIR = 'photo/albums';
const IMAGESDIR = 'photo/images';
let currentAlbumsData;
let currentImagesData;
let store;
let data;

const rebootData = () => {
  currentAlbumsData = getPathsOfFiles(ALBUMSDIR);
  currentImagesData = getPathsOfFiles(IMAGESDIR);
  store = Object.assign({}, {albums: currentAlbumsData}, {images: currentImagesData});
  data = {}; // object of data for render
};

rebootData();

app.route('/admin/:item?/:folder?/:upload?')
    .all((req, res, next) => {
      try {
        rebootData();
      } catch (e) {
        data.errorData = 'An error occurred while reading the data. Please push the button to reload the data';
      }
      data.page = 'Admin mode';
      data.host = req.headers.host; // host (localhost:3501)
      data.items = Object.keys(store); // items of menu
      data.currentItem = req.params.item; // current item
      data.currentFolder = req.params.folder; // current folder
      data.upload = req.params.upload;
      next();
    })
    .get((req, res) => {
      if (data.currentItem) {
        data.folders = Object.keys(store[data.currentItem]); // folders in item
      }
      if (data.currentFolder) {
        data.images = store[data.currentItem][data.currentFolder]; // images in folder
      }
      res.render('content', data);
    })
    .post((req, res) => {
      let delData = Object.keys(req.body);
      if (req.url === '/admin/' + data.currentItem + '/' + data.currentFolder && req.method === 'POST') {
        if (delData[0] === data.currentFolder) {
          rimraf.sync('photo/' + data.currentItem + '/' + data.currentFolder);
          res.redirect('/admin/' + data.currentItem);
        } else {
          delFiles(delData);
          res.redirect('/admin/' + data.currentItem + '/' + data.currentFolder);
        }
      }

      if (req.url === '/admin/' + data.currentItem + '/' + data.currentFolder + '/' + data.upload && req.method === 'POST') {
        console.log('upload');

      }
    });

app.get('/albums', (req, res) => {
  res.send(currentAlbumsData);
});

app.get('/images', (req, res) => {
  res.send(currentImagesData);
});

app.listen(3501, () => {
  console.log('App listening on port 3501!');
});
