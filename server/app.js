const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
// const fs = require('fs');
const rimraf = require('rimraf');
// const rmdir = require('rmdir');
// const {currentAlbumsData, currentImagesData} = require('./data');
const {getPathsOfFiles, delFiles, copyFile, createFolder} = require('./util');
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

// const auth = express.basicAuth((user, pass, next) => {
//   const result = (user === 'admin' && pass === 'lollipop');
//   next(null, result);
// });

app.use(express.static(path.resolve(pathRoot)));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json()); // ????

app.get('/', (req, res) => {
  res.sendFile(path.resolve(pathRoot + 'index.html'));
});

const ALBUMSDIR = 'photo/albums';
const IMAGESDIR = 'photo/images';
let currentAlbumsData;
let currentImagesData;
let store;
let data;

const getData = () => {
  currentAlbumsData = getPathsOfFiles(ALBUMSDIR);
  currentImagesData = getPathsOfFiles(IMAGESDIR);
  store = Object.assign({}, {albums: currentAlbumsData}, {images: currentImagesData});
  data = {}; // object of data for render
};

const rebootData = () => {
  try {
    getData();
  } catch (e) {
    data.errorData = 'An error occurred while reading the data. Please push the button to reload the data';
  }
};

app.route('/admin/:item?/:folder?/:upload?')
    .all((req, res, next) => {
      rebootData();
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
      let toFolder = '/' + data.currentItem + '/' + data.currentFolder;
      let delData = Object.keys(req.body);
      let form = new multiparty.Form();

      if (req.url === '/admin/' + data.currentItem && req.method === 'POST') {
        createFolder(path.resolve() + '/photo/' + data.currentItem + '/' + req.body.nameFolder);
        res.redirect('/admin/' + data.currentItem);
      }

      if (req.url === '/admin' + toFolder && req.method === 'POST') {
        if (delData[0] === data.currentFolder) {
          rimraf.sync('photo' + toFolder);
          res.redirect('/admin/' + data.currentItem);
        } else {
          delFiles(delData);
          res.redirect('/admin' + toFolder);
        }
      }

      if (req.url === '/admin' + toFolder + '/upload' && req.method === 'POST') {
        form.parse(req, (err, fields, files) => {
          if (err) {
            throw new Error(`An error occurred while uploading files. Error: ${err}`);
          } else {
            let n = 1;
            files.uploadFile.forEach((name, i) => {
              let sourceFile = name.path;
              let targetFile = path.resolve() + '/photo' + toFolder + '/' + name.originalFilename;
              copyFile(sourceFile, targetFile, (error) => {
                if (error) {
                  throw new Error(`An error occurred while copying file ${name.originalFilename}. Error: ${error}`);
                } else {
                  if (n === files.uploadFile.length) {
                    res.redirect('/admin' + toFolder);
                  } else {
                    n++;
                  }
                }
              });
            });
          }
        });
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
