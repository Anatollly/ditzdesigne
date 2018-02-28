const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const urlencode = require('urlencode');
const rimraf = require('rimraf');
const {getPathsOfFiles, delFiles, delFilesMin, copyFile, createFolder, resizeImage, checkDir} = require('./util');
const {Login} = require('./login');

const app = express();
const AdminLogin = new Login();
// const ALBUMSDIR = 'photo/albums';
const ALBUMMINDIR = 'photo/albums_min';
const IMAGESDIR = 'photo/images';
const MAXFILESUPLOAD = 20;
// const PATH_BUILD_PHOTO = path.resolve() + '/build/photo/';
let currentAlbumsData;
let currentImagesData;
let store;
let data;
const dataLogin = {};
let pathRoot = '';

if (app.get('env') === 'development') {
  pathRoot = 'build/';
}

console.log('__dirname: ', __dirname);
console.log('path resolve: ', path.resolve());


app.disable('x-powered-by');
app.set('views', path.resolve(pathRoot + 'server/views'));
app.set('view engine', 'pug');

app.use(express.static(path.resolve(pathRoot)));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json()); // ????

app.get('/', (req, res) => {
  res.sendFile(path.resolve(pathRoot + 'index.html'));
});

const getData = () => {
  currentAlbumsData = getPathsOfFiles(ALBUMMINDIR);
  currentImagesData = getPathsOfFiles(IMAGESDIR);
  store = Object.assign({}, {albums: currentAlbumsData}, {images: currentImagesData});
  data = {}; // object of data for render
  console.log('getData');
};

const rebootData = () => {
  try {
    getData();
  } catch (e) {
    data.errorData = 'An error occurred while reading the data. Please push the button to reload the data';
  }
};

rebootData();

app.route('/login')
    .all((req, res, next) => {
      dataLogin.host = req.headers.host;
      next();
    })
    .get((req, res) => {
      AdminLogin.logout();
      res.render('login', dataLogin);
      dataLogin.errorLogin = false;
    })
    .post((req, res) => {
      const {user, password} = req.body;
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('ip1: ', req.headers['x-forwarded-for']);
      console.log('ip2: ', req.connection.remoteAddress);
      AdminLogin.signin(user, password, ip);
      if (AdminLogin.checkLogin(ip)) {
        dataLogin.errorLogin = false;
        res.redirect('/admin');
      } else {
        dataLogin.errorLogin = true;
        res.redirect('/login');
      }
    });

app.route('/admin/:item?/:folder?/:upload?')
    .all((req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (!(AdminLogin.checkLogin(ip))) {
        res.redirect('/login');
      } else {
        if (data.errorData) {
          data.errorData = false;
          rebootData();
        }
        data.currentUrl = urlencode.decode(req.url);
        data.page = 'Admin mode';
        data.host = req.headers.host; // host (localhost:3501)
        data.items = Object.keys(store); // items of menu
        data.currentItem = req.params.item; // current item
        data.currentFolder = req.params.folder; // current folder
        data.upload = req.params.upload;
        next();
      }
    })
    .get((req, res) => {
      if (data.currentItem && data.currentFolder) {
        data.images = store[data.currentItem][data.currentFolder]; // images in folder
      }
      if (data.currentItem) {
        data.folders = Object.keys(store[data.currentItem]); // folders in item
      }
      if (data.upload) {
        data.maxFiles = MAXFILESUPLOAD;
      }
      res.render('content', data);
    })
    .post((req, res) => {
      if (req.body.logout === 'Logout') {
        res.redirect('/login');
      }
      let urlToItem = '/admin/' + data.currentItem;
      let urlToFolder = urlToItem + '/' + data.currentFolder;
      let pathToItem = '/build/photo/' + data.currentItem;
      let pathToFolder = pathToItem + '/' + data.currentFolder;
      let delData = Object.keys(req.body);
      const form = new multiparty.Form();

      if (data.currentUrl === urlToItem) {
        createFolder(path.resolve() + pathToItem + '/' + req.body.nameFolder, () => {
          if (data.currentItem === 'images') {
            rebootData();
            res.redirect(urlToItem);
          } else {
            createFolder(path.resolve() + '/build/' + ALBUMMINDIR + '/' + req.body.nameFolder, () => {
              rebootData();
              res.redirect(urlToItem);
            });
          }
        });
      }

      if (data.currentUrl === urlToFolder) {
        if (delData.length === 0) {
          res.redirect(urlToFolder);
        } else if (delData[0] === data.currentFolder) {
          rimraf(pathToFolder.slice(1), () => {
            rimraf('build/' + ALBUMMINDIR + '/' + data.currentFolder, () => {
              rebootData();
              res.redirect(urlToItem);
            });
          });
        } else {
          delFiles(delData, () => {
            delFilesMin(delData, () => {
              rebootData();
              res.redirect(urlToFolder);
            });
          });
        }
      }

      if (data.currentUrl === urlToFolder + '/upload') {
        form.parse(req, (err, fields, files) => {
          if (err) {
            throw new Error(`An error occurred while uploading files. Error: ${err}`);
          } else {
            if (files.uploadFile[0].size === 0) {
              res.redirect(urlToFolder);
            } else {
              let n = 0;
              const checkEnd = (array) => {
                n++;
                if (n === array.length) {
                  rebootData();
                  data.uploadImages = `${n} files uploaded`;
                  res.redirect(urlToFolder);
                }
              };
              files.uploadFile.forEach((name, i, arr) => {
                let sourceFile = name.path;
                let targetFile = path.resolve() + pathToFolder + '/' + name.originalFilename;
                let targetFileForMinImg = path.resolve() + '/build/photo/albums_min/' + data.currentFolder + '/' + name.originalFilename;
                copyFile(sourceFile, targetFile, (error) => {
                  if (error) {
                    throw new Error(`An error occurred while copying file ${name.originalFilename}. Error: ${error}`);
                  } else {
                    if (data.currentItem === 'images') {
                      checkEnd(arr);
                    } else {
                      resizeImage(sourceFile, targetFileForMinImg, () => {
                        checkEnd(arr);
                      });
                    }
                  }
                });
              });
            }
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

app.listen(process.env.PORT || 80, () => {
  console.log('App listening on port 80!');
});
