const express = require('express');
const app = express();
const path = require('path');
const {getNamesFromDir} = require('./util');
// const scanFolder = require('scan-folder');
// const data = require('./data');

if (process.env.COMPUTERNAME === 'TOLYANYCH') {
  process.env.NODE_ENV = 'development';
}

let pathRoot = '';

if (process.env.NODE_ENV === 'development') {
  pathRoot = 'build/';
}

console.log(pathRoot);
console.log(process.env.NODE_ENV);
console.log(__dirname);
console.log(path.resolve());

app.disable('x-powered-by');
app.set('views', path.resolve(pathRoot + 'server/views'));
app.set('view engine', 'pug');

const ALBUMSDIR = 'photo/albums';
const IMAGESDIR = 'photo/images';

// Сейчас app.js запускается с директории ditzdesigne, а в продакшене будет с build.
// сейчас app.js берет файлы в ditzdesigne/photo, а браузер - build/photo.
// в продакшене будет одна директория. ниче не поменяется, но нужно держать в уме

let allAlbumsData = getNamesFromDir(ALBUMSDIR);
let imagesOfPagesData = getNamesFromDir(IMAGESDIR);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(pathRoot + 'index.html'));
});

// app.param('album', (req, res, next, id) => {
//   console.log('first log');
//   next();
// });

// let storeAlbums = Object.assign({}, allAlbumsData);

app.get('/admin/:album?', (req, res) => {
  let storeAlbums = Object.assign({}, allAlbumsData);
  storeAlbums.albums = Object.keys(storeAlbums);
  storeAlbums.page = 'Admin mode';
  res.render('admin', storeAlbums);
});

app.get('/albums', (req, res) => {
  res.send(allAlbumsData);
});

app.get('/images', (req, res) => {
  res.send(imagesOfPagesData);
});

app.use(express.static(path.resolve(pathRoot)));

app.listen(3501, () => {
  console.log('App listening on port 3501!');
});
