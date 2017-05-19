// import showMenu from './templates/menu-view';
// import Slider from './templates/slider-view';
// import albumView from './templates/album-view';
import imageView from './templates/image-view';
import mainSliderView from './templates/main-slider-view';
import allAlbumsView from './templates/all-albums-view';
import {sliderData, galleryData, imageData} from './data/data';


//
// showMenu();
//

const rightPictures = document.querySelector('.rightPictures');
const backButton = document.querySelector('.row-4 .row__caption .name');
const albumBox = document.querySelector('.row-4 .row__image');
const screenImage = document.querySelector('.screenImage');

document.querySelector('.row-1 .row__content').insertBefore(mainSliderView(sliderData), rightPictures);

document.querySelector('.row-2 .row__image').appendChild(imageView(imageData.row2));
document.querySelector('.row-3 .row__image').appendChild(imageView(imageData.row3));

albumBox.appendChild(allAlbumsView(galleryData));
backButton.addEventListener('click', () => {
  albumBox.innerHTML = '';
  screenImage.innerHTML = '';
  albumBox.appendChild(allAlbumsView(galleryData));
});
