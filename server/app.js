const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const urlencode = require('urlencode');
// const fs = require('fs');
const rimraf = require('rimraf');
// const rmdir = require('rmdir');
// const {currentAlbumsData, currentImagesData} = require('./data');
const {getPathsOfFiles, delFiles, delFilesMin, copyFile, createFolder, resizeImage, checkDir} = require('./util');
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

// const ALBUMSDIR = 'photo/albums';
const ALBUMMINDIR = 'photo/albums_min';
const IMAGESDIR = 'photo/images';
const MAXFILESUPLOAD = 20;
let currentAlbumsData;
let currentImagesData;
let store;
let data;

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

app.route('/admin/:item?/:folder?/:upload?')
    .all((req, res, next) => {
      console.log(req.method);
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
      let urlToItem = '/admin/' + data.currentItem;
      let urlToFolder = urlToItem + '/' + data.currentFolder;
      let pathToItem = '/photo/' + data.currentItem;
      let pathToFolder = pathToItem + '/' + data.currentFolder;
      let delData = Object.keys(req.body);
      const form = new multiparty.Form();

      if (data.currentUrl === urlToItem) {
        createFolder(path.resolve() + pathToItem + '/' + req.body.nameFolder, () => {
          createFolder(path.resolve() + '/' + ALBUMMINDIR + '/' + req.body.nameFolder, () => {
            rebootData();
            res.redirect(urlToItem);
          });
        });
      }

      if (data.currentUrl === urlToFolder) {
        if (delData[0] === data.currentFolder) {
          rimraf(pathToFolder.slice(1), () => {
            rimraf(ALBUMMINDIR + '/' + data.currentFolder, () => {
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
            let n = 0;
            files.uploadFile.forEach((name, i, arr) => {
              let sourceFile = name.path;
              let targetFile = path.resolve() + pathToFolder + '/' + name.originalFilename;
              let targetFileForMinImg = path.resolve() + '/photo/albums_min/' + data.currentFolder + '/' + name.originalFilename;
              copyFile(sourceFile, targetFile, (error) => {
                if (error) {
                  throw new Error(`An error occurred while copying file ${name.originalFilename}. Error: ${error}`);
                } else {
                  resizeImage(sourceFile, targetFileForMinImg, () => {
                    n++;
                    if (n === arr.length) {
                      rebootData();
                      data.uploadImages = `${n} files uploaded`;
                      res.redirect(urlToFolder);
                    }
                  });
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


// const handlePostRequest = () => {
//   return new Promise((resolve, reject) => {
//     if (req.url === urlToItem) {
//       createFolder(path.resolve() + pathToItem + '/' + req.body.nameFolder);
//     } else if (req.url === urlToFolder) {
//       if (delData[0] === data.currentFolder) {
//         rimraf.sync(pathToFolder.slice(1));
//       } else {
//         delFiles(delData);
//       }
//     } else if (req.url === urlToFolder + '/upload') {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject(`An error occurred while uploading files. Error: ${err}`);
//         } else {
//           let n = 1;
//           files.uploadFile.forEach((name, i) => {
//             let sourceFile = name.path;
//             let targetFile = path.resolve() + pathToFolder + '/' + name.originalFilename;
//             copyFile(sourceFile, targetFile, (error) => {
//               if (error) {
//                 reject(`An error occurred while copying file ${name.originalFilename}. Error: ${error}`);
//               } else {
//                 if (n === files.uploadFile.length) {
//                   console.log(n + ' finish');
//                   resolve();
//                 } else {
//                   console.log(n);
//                   n++;
//                 }
//               }
//             });
//           });
//         }
//       });
//     }
//   });
// };
//
// handlePostRequest()
//     .then(rebootData)
//     .then(() => res.redirect(urlToFolder))
//     .catch();
