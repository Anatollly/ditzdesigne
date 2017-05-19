// import showMenu from './templates/menu-view';
import Slider from './templates/slider-view';
import albumView from './templates/album-view';
import imageView from './templates/image-view';
// import screenSliderView from './templates/screen-slider-view';
import {sliderData, galleryData, imageData} from './data/data';

//
// showMenu();
//

const mainSlider = new Slider(sliderData);
mainSlider.showSlider();

document.querySelector('.row-2 .row__image').appendChild(imageView(imageData.row2));
document.querySelector('.row-3 .row__image').appendChild(imageView(imageData.row3));
document.querySelector('.row-4 .row__image').appendChild(albumView(galleryData.album1));
// document.querySelector('.row-4 .screenImage').appendChild(screenSliderView(galleryData.album1));
