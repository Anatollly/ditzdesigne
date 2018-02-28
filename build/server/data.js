const {getPathsOfFiles} = require('./util');

const ALBUMSDIR = 'photo/albums';
const IMAGESDIR = 'photo/images';

const currentAlbumsData = getPathsOfFiles(ALBUMSDIR);
const currentImagesData = getPathsOfFiles(IMAGESDIR);

// const copiedAlbumsData = Object.assign({}, currentAlbumsData);
// const copiedImagesData = Object.assign({}, currentImagesData);

module.exports = {
  currentAlbumsData,
  currentImagesData
};
