const {getNamesFromDir} = require('./util');

const ALBUMSDIR = 'photo/albums';

let allAlbumsData = getNamesFromDir(ALBUMSDIR);
